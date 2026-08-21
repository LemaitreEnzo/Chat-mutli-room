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
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [roomId, setRoomId] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!isLogged) return;

    socket.emit("join_room", { roomId });

    return () => {
      socket.emit("leave_room", { roomId });
    };
  }, [isLogged, roomId]);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

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
