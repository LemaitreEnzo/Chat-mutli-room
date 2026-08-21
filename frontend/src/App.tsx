import { useEffect, useState } from "react";
import "./App.css";
import ChatRoom from "./components/layout/ChatRoom/ChatRoom";
import NavBar from "./components/ui/NavBar/NavBar";
import { socket } from "./socket";
import type { Message, Room } from "./types/global.type";

const rooms: Room[] = [
  { id: "general", label: "Général" },
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "devops", label: "DevOps" },
];

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [roomId, setRoomId] = useState("general");
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

  const handleRoomChange = (newRoomId: string) => {
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
