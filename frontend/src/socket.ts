import { io, Socket } from "socket.io-client";

export const socket: Socket = io(`http://localhost:${import.meta.env.VITE_SOCKET_PORT}`);
