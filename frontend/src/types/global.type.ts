export type Room = {
  id: number;
  label: string;
};

export type Message = {
  author: string;
  content: string;
  roomId: number;
};
