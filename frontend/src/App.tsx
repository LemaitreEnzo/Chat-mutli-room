import { useEffect, useState } from "react";
import "./App.css";
import ChatRoom from "./components/layout/ChatRoom/ChatRoom";
import NavBar from "./components/ui/NavBar/NavBar";
import { socket } from "./socket";
import type { Message, Room } from "./types/global.type";

const rooms: Room[] = [
  { id: 1, label: "Général" },
  { id: 2, label: "Front" },
  { id: 3, label: "Back" },
  { id: 4, label: "DevOps" },
];

function App() {
  const [pseudo, setPseudo] = useState<string | null>(() =>
    localStorage.getItem("pseudo"),
  );
  const [isLogged, setIsLogged] = useState<boolean>(
    () => !!localStorage.getItem("pseudo"),
  );
  const [roomId, setRoomId] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!isLogged) return;

    socket.emit("join_room", { roomId, pseudo });

    return () => {
      socket.emit("leave_room", { roomId, pseudo });
    };
  }, [isLogged, roomId, pseudo]);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("pseudo") as string;

    if (input && input.trim() !== "") {
      localStorage.setItem("pseudo", input.trim());
      setPseudo(input.trim());
      setIsLogged(true);
    }
  };

  if (!isLogged) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Entrez votre pseudo pour accéder au chat</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="pseudo"
            placeholder="Votre pseudo..."
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    );
  }

  const handleSendMessage = (content: string) => {
    socket.emit("send_message", { roomId, content });
  };

  const handleRoomChange = (newRoomId: number) => {
    setRoomId(newRoomId);
    setMessages([]);
  };

  return (
    <section>
      <NavBar
        rooms={rooms}
        activeRoomId={roomId}
        onRoomChange={handleRoomChange}
      />
      <ChatRoom messages={messages} onSendMessage={handleSendMessage} />
    </section>
  );
}

export default App;
