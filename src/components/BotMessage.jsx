/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function BotMessage({ fetchMessage, showRecorder }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      try {
        const response = await fetchMessage();
        setMessage("");

        for (let i = 0; i <= response.message.length; i++) {
          setMessage((prevMessage) => response.message.slice(0, i));

          if (response.message[i] !== " ") {
            await new Promise((resolve) => setTimeout(resolve, 25));
          }
        }
      } catch (error) {
        console.error("Error loading message:", error);
      }
    }

    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">
        <span>{message}</span>
      </div>
    </div>
  );
}
