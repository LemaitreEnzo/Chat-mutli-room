import { io, Socket } from "socket.io-client";

export const socket: Socket = io(`http://localhost:${process.env.SOCKET_PORT}`);
