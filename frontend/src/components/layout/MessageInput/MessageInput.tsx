import { useState } from "react";
import type { PropsMessageInput } from "../../../types/props.type";
import "./MessageInput.css";

function MessageInput({ onSend }: PropsMessageInput) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    onSend(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="messageInput"
        id="messageInput"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn-send">
        Envoyer
      </button>
    </form>
  );
}

export default MessageInput;
