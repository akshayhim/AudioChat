/* eslint-disable react/prop-types */
export default function UserMessage({ message }) {
  const renderMessageContent = () => {
    if (!message) {
      return null;
    }

    if (message.sender === "bot") {
      // Exclude microphone icon or recording button for bot messages
      return (
        <div className="bot-message">
          <span>{message.text}</span>
        </div>
      );
    }

    if (message.type === "audio") {
      return (
        <div className="user-message">
          {message.audio && (
            <audio src={message.audio.url} controls={message.audio.controls} />
          )}
        </div>
      );
    }

    // Handle other message types (e.g., text) for user messages
    return <div className="user-message">{message.text}</div>;
  };

  return <div className="message-container">{renderMessageContent()}</div>;
}
