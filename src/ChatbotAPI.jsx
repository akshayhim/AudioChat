const API = {
  GetChatbotResponse: async (message) => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (
          message === "1" ||
          message === "Record Audio" ||
          message === "1.Record Audio" ||
          message === "record audio" ||
          message === "1. record audio" ||
          message === "1. Record audio" ||
          message === "1. record Audio" ||
          message === "1.record Audio" ||
          message === "1.record" ||
          message === "1. record" ||
          message === "1. Record" ||
          message === "1.Record" ||
          message === "Record" ||
          message === "record"
        ) {
          resolve({ message: "Recorder added below", show: true });
        } else if (
          message === "2" ||
          message === "Recording Done" ||
          message === "2.Recording Done" ||
          message === "2.recording done" ||
          message === "recording done" ||
          message === "2. recording done" ||
          message === "2. Recording Done" ||
          message === "2. Recording done" ||
          message === "2. recording Done" ||
          message === "2.Recording done" ||
          message === "done" ||
          message === "Done" ||
          message === "2.Done" ||
          message === "2.done" ||
          message === "2. done" ||
          message === "2. Done"
        ) {
          resolve({ message: "Recorder removed from below", show: false });
        } else if (message.includes("Audio")) {
          resolve({ message: "Audio Message Received 😊", show: true });
        } else {
          resolve({
            message:
              "This Audio Recording Chatbot has 2 options -\n" +
              "1. Record Audio\n" +
              "2. Recording Done.\n" +
              "Select either of the two by typing the option number or the message",
            show: false,
          });
        }
      }, 600);
    });
  },
};

export default API;
