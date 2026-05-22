import React, { useEffect, useState, useCallback } from "react";

import { motion } from "framer-motion";

import { FaHeart } from "react-icons/fa";

import "./Countdown.css";

function Countdown() {
  const weddingDate = "2027-01-10T00:00:00";

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
    {
      label: "NGÀY",
      value: timeLeft.days,
    },

    {
      label: "GIỜ",
      value: timeLeft.hours,
    },

    {
      label: "PHÚT",
      value: timeLeft.minutes,
    },

    {
      label: "GIÂY",
      value: timeLeft.seconds,
    },
  ];

  return (
    <section className="romantic-countdown">
      {/* FLOATING HEARTS */}

      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BLUR */}

      <div className="countdown-blur blur1"></div>
      <div className="countdown-blur blur2"></div>

      <div className="countdown-container">
        {/* HEADER */}

        <motion.div
          className="countdown-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="countdown-heart">
            <FaHeart />
          </div>

          <span className="countdown-tag">SAVE THE DATE</span>

          <h2>Đếm Ngược Ngày Chung Đôi</h2>

          <div className="countdown-divider"></div>

          <p>
            Chúng mình đang háo hức từng ngày để được gặp bạn trong khoảnh khắc
            hạnh phúc nhất 🤍
          </p>
        </motion.div>

        {/* COUNTDOWN */}

        <div className="countdown-grid">
          {timeUnits.map((item, index) => (
            <motion.div
              key={index}
              className="countdown-card"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
            >
              {/* GLOW */}

              <div className="card-glow"></div>

              {/* NUMBER */}

              <motion.div
                key={item.value}
                initial={{
                  scale: 0.8,
                  opacity: 0.4,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="count-number"
              >
                {formatNumber(item.value)}
              </motion.div>

              {/* LABEL */}

              <span className="count-label">{item.label}</span>

              {/* DECOR */}

              <div className="bottom-line"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Countdown;
