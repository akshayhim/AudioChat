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
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    async function loadWelcomeMessage() {
      const welcomeMessage = await API.GetChatbotResponse("hi");
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={() => Promise.resolve(welcomeMessage)}
        />,
      ]);
      setShowFooter(welcomeMessage.show);
    }

    loadWelcomeMessage();
  }, []);

  const send = async (content) => {
    if (typeof content === "string") {
      const userMessage = (
        <UserMessage key={messages.length + 1} message={{ text: content }} />
      );
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await API.GetChatbotResponse(content);

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

      const botResponse = await API.GetChatbotResponse("Audio received");
      setTimeout(() => {
        const botMessage = (
          <BotMessage
            key={messages.length + 2}
            fetchMessage={() => Promise.resolve(botResponse)}
            showRecorder={true}
          />
        );
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setShowFooter(botResponse.show);
      }, 200);
    }
  };

  const sendAudio = (audioMessage) => {
    send(audioMessage);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
      {showFooter && <Footer onSend={send} onSendAudio={sendAudio} />}
    </div>
  );
}