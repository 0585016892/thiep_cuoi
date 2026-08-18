import React, { useState, useEffect } from "react";
import "./App.css";

// Components
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

// Pages
import QuanLyKhachMoi from "./page/QuanLyKhachMoi";

// Navigation Bar & Floating Controls
import NavigationBar from "./components/Navigation/NavigationBar";
import ScrollToTop from "./components/Navigation/ScrollToTop";

function App() {
  // 1. TẤT CẢ HOOKS PHẢI ĐƯỢC KHAI BÁO DƯỚI ĐÂY (TOP-LEVEL)
  const [activeSection, setActiveSection] = useState("hero");

  // Hàm cuộn mượt đến section theo id
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Lắng nghe sự kiện scroll để highlight tab tương ứng trên Navbar
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

  // 2. CÁC LỆNH ĐIỀU KIỆN / EARLY RETURN ĐẶT SAU TẤT CẢ HOOKS
  if (window.location.pathname === "/quan-ly-khach-moi") {
    return <QuanLyKhachMoi />;
  }

  // 3. RENDER TRANG CHÍNH
  return (
    <div className="wedding-app-container">
      {/* Hiệu ứng hoa rơi & Trình phát nhạc */}
      <FallingHy />
      <MusicPlayer />

      {/* Floating Glassmorphic Navbar */}
      <NavigationBar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Wedding Content */}
      <main className="wedding-main-content">
        <section id="hero">
          <Hero />
        </section>

        <section id="wedding-info">
          <WeddingInfo />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="timeline">
          <Timeline />
        </section>

        <section id="countdown">
          <Countdown />
        </section>

        <section id="rsvp">
          <RSVP />
        </section>

        <section id="qr-gift">
          <QRGift />
        </section>

        <section id="love-story">
          <LoveStory />
        </section>

        <section id="wishes">
          <Wishes />
        </section>

        <footer id="footer">
          <Footer />
        </footer>
      </main>

      {/* Nút cuộn nhanh lên đầu trang */}
      <ScrollToTop onScrollTop={() => scrollToSection("hero")} />
    </div>
  );
}

export default App;
