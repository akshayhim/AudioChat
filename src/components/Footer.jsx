/* eslint-disable react/prop-types */
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const Footer = ({ onSendAudio }) => {
  const recorderControls = useAudioRecorder(
    {
      // noiseSuppression: false,
      echoCancellation: true,
      autoGainControl: false,
      volume: 1.0,
    },
    (err) => console.table(err)
  );

  const chunksToBlob = (chunks) => {
    try {
      const audioBlob = new Blob(chunks, { type: "audio/mp3" });
      return audioBlob;
    } catch (error) {
      console.error("Error creating Blob:", error);
      return null;
    }
  };

  const addAudioElement = (blob) => {
    if (!blob) {
      console.error("Invalid Blob:", blob);
      return;
    }

    const url = URL.createObjectURL(blob);

    const userAudioMessage = {
      type: "audio",
      audio: {
        url: url,
        controls: true,
      },
    };

    onSendAudio(userAudioMessage);
  };

  return (
    <div className="footer">
      <AudioRecorder
        onRecordingComplete={(chunks) => addAudioElement(chunks)}
        recorderControls={recorderControls}
        showVisualizer={true}
        className="recorderElement"
      />
      <br />
    </div>
  );
};

export default Footer;
