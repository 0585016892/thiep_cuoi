import "./App.css";

import Hero from "./components/Hero/Hero";
import WeddingInfo from "./components/WeddingInfo/WeddingInfo.jsx";
import Countdown from "./components/Countdown/Countdown";
import LoveStory from "./components/LoveStory/LoveStory";
import Gallery from "./components/Gallery/Gallery";
import Timeline from "./components/Timeline/Timeline";
import RSVP from "./components/RSVP/RSVP";
import Wishes from "./components/Wishes/Wishes";
import QRGift from "./components/QRGift/Gift";
import Footer from "./components/Footer/Footer.jsx";
import MusicPlayer from "./components/Music/MusicPlayer";
import FallingHy from "./components/Hero/FallingHy";

function App() {
  return (
    <div>
      <FallingHy />

      <MusicPlayer />
      <Hero />
      <WeddingInfo />
      <Gallery />
      <Timeline />
      <Countdown />
      <RSVP />
      <QRGift />
      <LoveStory />
      <Wishes />
      <Footer />
    </div>
  );
}

export default App;
