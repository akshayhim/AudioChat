/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import Footer from "./Footer";

export default function BotMessage({ fetchMessage, showRecorder }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      try {
        const response = await fetchMessage();

        // Clear the message before typing a new one
        setMessage("");

        // Simulate typing effect
        for (let i = 0; i <= response.message.length; i++) {
          setMessage((prevMessage) => response.message.slice(0, i));

          // Skip delay for spaces
          if (response.message[i] !== " ") {
            await new Promise((resolve) => setTimeout(resolve, 30));
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
      {/* {showRecorder && <Footer onSend={() => {}} />}{" "} */}
      {/* Make sure onSend is passed */}
    </div>
  );
}
