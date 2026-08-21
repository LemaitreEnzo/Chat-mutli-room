import type { Server as HTTPServer } from "http";
import {Server} from "socket.io";
import { getMessages, createMessage } from "../controllers/message.controller";

export function setupSocket(server: HTTPServer) {
  const ioServer = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  ioServer.on('connection', (socket) => {
    console.log(`Un client c'est connecté ID : ${socket.id}`);

    socket.on('join_room', (data) => {
      const room = data.room;
      socket.join(room);
    });

    socket.on('leave_room', (data) => {

    });

    socket.on('send_message', (data) => {

    });

    socket.on('disconnect', () => {

    });
  })
}
