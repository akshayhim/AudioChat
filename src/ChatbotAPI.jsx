const API = {
  GetChatbotResponse: async (message) => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (
          message === "1" ||
          message === "Record Audio" ||
          message === "1.Record Audio"
        ) {
          // Resolve the message and set show to true
          resolve({ message: "Recorder added below", show: true });
        } else if (
          message === "2" ||
          message === "Recording Done" ||
          message === "2.Recording Done"
        ) {
          // Resolve the message and set show to false
          resolve({ message: "Recorder removed from below", show: false });
        } else if (message.includes("Audio")) {
          // Special handling for audio messages
          resolve({ message: "Audio Message Received", show: true });
        } else {
          // Resolve the message and set show to true
          resolve({
            message:
              "This Audio Recording Chatbot has 2 options -\n" +
              "1. Record Audio\n" +
              "2. Recording Done.\n" +
              "Select either of the two by typing the option number or the message",
            show: false,
          });
        }
      }, 1000);
    });
  },
};

export default API;
