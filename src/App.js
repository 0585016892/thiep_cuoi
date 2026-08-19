import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import Hero from "./components/Hero/Hero";
import WeddingInfo from "./components/WeddingInfo/WeddingInfo.jsx";
import Countdown from "./components/Countdown/Countdown";
import LoveStory from "./components/LoveStory/LoveStory";
import Gallery from "./components/Gallery/Gallery";
import MemoriesGallery from "./components/Gallery/MemoriesGallery.jsx";
import Timeline from "./components/Timeline/Timeline";
import RSVP from "./components/RSVP/RSVP";
import Wishes from "./components/Wishes/Wishes";
import QRGift from "./components/QRGift/Gift";
import Footer from "./components/Footer/Footer.jsx";
import MusicPlayer from "./components/Music/MusicPlayer";
import FallingHy from "./components/Hero/FallingHy";
import RsvpReminder from "./components/RsvpReminder/RsvpReminder";

// Pages
import QuanLyKhachMoi from "./page/QuanLyKhachMoi";

// Navigation Bar & Floating Controls
import NavigationBar from "./components/Navigation/NavigationBar";
import ScrollToTop from "./components/Navigation/ScrollToTop";

// Component Phân cách giữa các Section
const SectionDivider = () => (
  <div className="section-divider">
    <span className="divider-line"></span>
    <span className="divider-icon">囍</span>
    <span className="divider-line"></span>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "wedding-info",
        "gallery",
        "timeline",
        "rsvp",
        "qr-gift",
        "love-story",
        "wishes",
        "memori-gallery",
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (window.location.pathname === "/quan-ly-khach-moi") {
    return <QuanLyKhachMoi />;
  }

  return (
    <div className="wedding-app-container">
      {/* Hiệu ứng hoa rơi & Trình phát nhạc */}
      <FallingHy />
      <MusicPlayer />

      {/* Main Content */}
      <main className="wedding-main-content">
        <NavigationBar
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <section id="hero" className="seamless-section">
          <Hero />
        </section>

        <SectionDivider />

        <section id="wedding-info" className="seamless-section">
          <WeddingInfo />
        </section>

        <SectionDivider />

        <section id="gallery" className="seamless-section">
          <Gallery />
        </section>

        <SectionDivider />

        <section id="timeline" className="seamless-section">
          <Timeline />
        </section>

        <SectionDivider />

        <section id="countdown" className="seamless-section">
          <Countdown />
        </section>

        <SectionDivider />

        <section id="rsvp" className="seamless-section">
          <RSVP />
        </section>

        <SectionDivider />

        <section id="qr-gift" className="seamless-section">
          <QRGift />
        </section>

        <SectionDivider />

        <section id="love-story" className="seamless-section">
          <LoveStory />
        </section>
        <section id="memori-gallery" className="seamless-section">
          <MemoriesGallery />
        </section>
        <SectionDivider />

        <section id="wishes" className="seamless-section">
          <Wishes />
        </section>

        <footer id="footer">
          <Footer />
        </footer>

        <RsvpReminder />
      </main>

      <ScrollToTop onScrollTop={() => scrollToSection("hero")} />
    </div>
  );
}

export default App;
