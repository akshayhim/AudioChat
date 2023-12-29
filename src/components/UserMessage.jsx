/* eslint-disable react/prop-types */
export default function UserMessage({ message }) {
  const renderMessageContent = () => {
    if (!message) {
      return null;
    }

    if (message.sender === "bot") {
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

    return <div className="user-message">{message.text}</div>;
  };

  return <div className="message-container">{renderMessageContent()}</div>;
}
