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
      const createdAt = new Date().toISOString();

      const messageData = {
        username: 'eeeee',
        text: data.content,
        roomId: data.roomId,
        createdAt: createdAt,
      }

      console.log(data);

      createMessage(messageData)
      .then(() => {
            console.log('Message enregistré dans la base de données');
            ioServer.to(data.room).emit(`receive_message`, messageData);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'enregistrement du message :', error);
        });
      
    });

    socket.on('disconnect', () => {

    });
  })
}
