export interface ServerToClientEvents {
  message: (payload: {
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }) => void;
  userJoined: (username: string) => void;
  userTyping: (username: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (text: string) => void;
  join: (username: string) => void;
  typing: () => void;
}
