import { useEffect, useState } from "react";
import "./Hero.css";
import { motion } from "framer-motion";
import anhcuoi from "../../assets/anhcuoi.png";
import { FaCalendarAlt, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

function Hero() {
  // Cập nhật ngày đích: 27/12/2026
  const targetDate = new Date("2026-12-27T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Nếu đã qua ngày cưới
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="editorial-hero">
      <div className="hero-blur-bg">
        <img src={anhcuoi} alt="Background Blur" />
      </div>

      <div className="hero-main-layout">
        <motion.div
          className="hero-text-side"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="editorial-tag">
            <span className="dot"></span>
            <span>THE WEDDING OF</span>
          </div>

          <div className="names-creative">
            <motion.h1
              className="groom-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Khánh Hưng
            </motion.h1>

            <div className="ampersand-badge">
              <span>&</span>
            </div>

            <motion.h1
              className="bride-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Trang Trang
            </motion.h1>
          </div>

          <p className="wedding-quote">
            "Hai trái tim — Một hành trình tình yêu trọn vẹn"
          </p>

          <div className="info-chips">
            <div className="chip">
              <FaCalendarAlt className="chip-icon" />
              <span>Chủ Nhật, 27.12.2026</span>
            </div>
            <div className="chip">
              <FaMapMarkerAlt className="chip-icon" />
              <span>Xã Vũ Quý, Tỉnh Hưng Yên</span>
            </div>
          </div>

          {/* Bộ Đếm Ngược Countdown đã cập nhật theo ngày mới */}
          <div className="countdown-container">
            <div className="time-block">
              <span className="number">{timeLeft.days}</span>
              <span className="label">Ngày</span>
            </div>
            <span className="colon">:</span>
            <div className="time-block">
              <span className="number">{timeLeft.hours}</span>
              <span className="label">Giờ</span>
            </div>
            <span className="colon">:</span>
            <div className="time-block">
              <span className="number">{timeLeft.minutes}</span>
              <span className="label">Phút</span>
            </div>
            <span className="colon">:</span>
            <div className="time-block">
              <span className="number">{timeLeft.seconds}</span>
              <span className="label">Giây</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-side"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="arch-frame">
            <motion.img
              src={anhcuoi}
              alt="Khánh Hưng & Trang Trang"
              className="photo-main"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
            />
            <div className="frame-border"></div>
            <div className="save-date-badge">
              <FaHeart className="badge-heart" />
              <span>27 • 12 • 2026</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bottom-wave-fade"></div>
    </section>
  );
}

export default Hero;
