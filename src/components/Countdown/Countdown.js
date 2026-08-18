import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./Countdown.css";

function Countdown() {
  // Cập nhật đúng ngày cử hành hôn lễ: 27/12/2026
  const weddingDate = "2026-12-27T09:00:00";

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(weddingDate) - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [weddingDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const timeUnits = [
    { label: "NGÀY", value: timeLeft.days },
    { label: "GIỜ", value: timeLeft.hours },
    { label: "PHÚT", value: timeLeft.minutes },
    { label: "GIÂY", value: timeLeft.seconds },
  ];

  return (
    <section className="sage-countdown-section">
      {/* Background Soft Glows */}
      <div className="countdown-glow glow-left"></div>
      <div className="countdown-glow glow-right"></div>

      <div className="countdown-content-wrapper">
        {/* HEADER SECTION */}
        <motion.div
          className="editorial-countdown-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="countdown-badge">
            <span className="dot"></span>
            <span>COUNTDOWN TO OUR DAY</span>
            <span className="dot"></span>
          </div>

          <h2 className="countdown-title">Đếm Ngược Ngày Chung Đôi</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="countdown-subtitle">
            Khánh Hưng & Trang Trang đang háo hức từng ngày để cùng bạn sẻ chia
            khoảnh khắc hạnh phúc nhất 🤍
          </p>
        </motion.div>

        {/* COUNTDOWN GRID */}
        <div className="countdown-grid">
          {timeUnits.map((item, index) => (
            <motion.div
              key={index}
              className="time-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-inner">
                {/* NUMBER ANIMATION */}
                <motion.div
                  key={item.value}
                  initial={{ scale: 0.85, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="time-number"
                >
                  {formatNumber(item.value)}
                </motion.div>

                {/* LABEL */}
                <span className="time-label">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Countdown;
