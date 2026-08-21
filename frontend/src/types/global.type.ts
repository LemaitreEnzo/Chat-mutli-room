export type Room = {
  id: string;
  label: string;
};

export type Message = {
  author: string;
  content: string;
  roomId: string;
};
