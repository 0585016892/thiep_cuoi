import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./Countdown.css";

function Countdown() {
  const weddingDate = "2027-01-10T00:00:00";

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(weddingDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  // --- CẤU HÌNH ANIMATION KHI CUỘN XUỐNG ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Mỗi phần tử con xuất hiện cách nhau 0.15s
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 }, // Trạng thái ẩn: lệch dưới 40px và hơi nhỏ lại
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Spring-like easing sang trọng
    },
  };

  const timeUnits = [
    { label: "NGÀY", value: timeLeft.days, max: 365 },
    { label: "GIỜ", value: timeLeft.hours, max: 24 },
    { label: "PHÚT", value: timeLeft.minutes, max: 60 },
    { label: "GIÂY", value: timeLeft.seconds, max: 60 },
  ];

  return (
    <section className="luxury-countdown-section">
      <div className="countdown-bg-glow"></div>

      <motion.div
        className="countdown-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // once: true nghĩa là hiệu ứng chỉ chạy một lần duy nhất khi cuộn xuống
        // margin: "-150px" giúp kích hoạt animation khi element đi vào cách mép dưới màn hình 150px (tránh vừa chạm rìa đã hiện)
        viewport={{ once: true, margin: "-150px" }}
      >
        {/* Tiêu đề xuất hiện trước */}
        <motion.div variants={itemVariants} className="countdown-header">
          <span className="countdown-tag">COUNTDOWN TO THE BIG DAY</span>
          <h2 className="countdown-main-title">Ngày Chung Đôi</h2>
          <div className="countdown-line-decorator">
            <span className="dot"></span>
          </div>
        </motion.div>

        {/* Khối Grid chứa các vòng tròn lần lượt hiện ra */}
        <div className="luxury-clock-grid">
          {timeUnits.map((unit, index) => {
            const radius = 45;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset =
              unit.max > 0
                ? circumference - (unit.value / unit.max) * circumference
                : circumference;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="countdown-circle-item"
              >
                <div className="svg-ring-wrapper">
                  <svg className="countdown-svg-circle" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} className="circle-bg" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="circle-progress"
                      strokeDasharray={circumference}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </svg>

                  <div className="countdown-number-box">
                    <span className="digit">{formatNumber(unit.value)}</span>
                  </div>
                </div>

                <span className="unit-label">{unit.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Dòng chữ cuối hiện sau cùng */}
        <motion.p variants={itemVariants} className="countdown-footer-text">
          Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng tôi
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Countdown;
