/* eslint-disable react/prop-types */
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const Footer = ({ onSendAudio }) => {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);

    // Simulate a user message with audio
    const userAudioMessage = {
      type: "audio",
      audio: {
        url: url,
        controls: true,
      },
    };

    // Send the user message with audio to the chatbot
    onSendAudio(userAudioMessage);
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        showVisualizer={true}
      />
      <br />
    </div>
  );
};

export default Footer;
