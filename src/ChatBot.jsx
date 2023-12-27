import { useState, useEffect } from "react";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";
import Footer from "./components/Footer";

import API from "./ChatbotAPI";

import "./App.css";
import Header from "./components/Header";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [showFooter, setShowFooter] = useState(false); // New state for Footer visibility

  useEffect(() => {
    async function loadWelcomeMessage() {
      const welcomeMessage = await API.GetChatbotResponse("hi");
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={() => Promise.resolve(welcomeMessage)}
        />,
      ]);
      setShowFooter(welcomeMessage.show); // Set Footer visibility based on the response
    }

    loadWelcomeMessage();
  }, []);

  const send = async (content) => {
    if (typeof content === "string") {
      // Text message
      const userMessage = (
        <UserMessage key={messages.length + 1} message={{ text: content }} />
      );
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Fetch the bot's response
      const response = await API.GetChatbotResponse(content);

      // Introduce a delay before showing the bot's message
      setTimeout(() => {
        const botMessage = (
          <BotMessage
            key={messages.length + 2}
            fetchMessage={() => Promise.resolve(response)}
          />
        );
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setShowFooter(response.show);
      }, 200);
    } else if (content.type === "audio") {
      const userAudioMessage = (
        <UserMessage key={messages.length + 1} message={content} />
      );
      setMessages((prevMessages) => [...prevMessages, userAudioMessage]);

      // Simulate sending the audio to the bot
      const botResponse = await API.GetChatbotResponse("Audio received");
      setTimeout(() => {
        const botMessage = (
          <BotMessage
            key={messages.length + 2}
            fetchMessage={() => Promise.resolve(botResponse)}
            showRecorder={true} // Add a prop to indicate whether to show the recorder
          />
        );
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setShowFooter(botResponse.show);
      }, 200);
    }
  };

  const sendAudio = (audioMessage) => {
    // Call the existing send function with the audio message
    send(audioMessage);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
      {showFooter && <Footer onSend={send} onSendAudio={sendAudio} />}
      {/* Render Footer conditionally based on showFooter state */}
    </div>
  );
}
