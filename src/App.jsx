import "./App.css";
import Chatbot from "./ChatBot";

function App() {
  return (
    <>
      <Chatbot />
      {/* For Larger Devices */}
      <p className="contact-info">Developed by Akshay Himatsingka<br /> for Ohile Internship Assignment <br /></p>
      {/* For Smaller Devices */}
      <p className="contact-info-2">Developed by Akshay Himatsingka<br /> for Ohile Internship Assignment <br /></p>
    </>
  );
}

export default App;
