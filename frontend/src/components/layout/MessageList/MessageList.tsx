import type { PropsMessageList } from "../../../types/props.type";
import "./MessageList.css";

function MessageList({ messages }: PropsMessageList) {
  return (
    <div id="messages">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.author}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
