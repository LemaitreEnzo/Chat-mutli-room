import type { PropsChatRoom } from "../../../types/props.type";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";

import "./ChatRoom.css";

function ChatRoom({ messages, onSendMessage }: PropsChatRoom) {
  return (
    <article>
      <MessageList messages={messages} />
      <div id="typingIndicator" className="typing-indicator"></div>
      <MessageInput onSend={onSendMessage} />
    </article>
  );
}

export default ChatRoom;
