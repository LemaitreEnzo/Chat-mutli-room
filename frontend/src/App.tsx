import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

const socket: Socket = io("http://localhost:3000");

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [roomId, setRoomId] = useState("Général");

  useEffect(() => {
    if (!isLogged) return;

    return () => {
      socket.emit("join_room", { roomId });
    };
  }, [isLogged, roomId]);

  return <></>;
}

export default App;
