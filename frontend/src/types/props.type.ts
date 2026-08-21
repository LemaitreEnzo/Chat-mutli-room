import type { Message, Room } from "./global.type";

export interface PropsBase {
  children: React.ReactNode;
}

export interface PropsButton extends PropsBase {
  className?: "btn-primary" | "btn-secondary";
  shape?: "rectangle" | "oval";
  type?: "button" | "submit" | "reset";
  href?: string;
}

export type PropsNavBar = {
  rooms: Room[];
  activeRoomId: number;
  onRoomChange: (newRoomId: number) => void;
};
export interface PropsMessageList {
  messages: Message[];
}

export interface PropsChatRoom {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export interface PropsMessageInput {
  onSend: (content: string) => void;
}
