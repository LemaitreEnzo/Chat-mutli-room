import type { Server } from "http";
import { io } from "socket.io-client";

export function setupSocket(server: Server) {
  const ioServer = io(server);
}
