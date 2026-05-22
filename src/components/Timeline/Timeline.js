import React from "react";
import { motion } from "framer-motion";

import {
  FaHeart,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaChurch,
} from "react-icons/fa";

import "./Timeline.css";

function Timeline() {
  const timelineData = [
    {
      icon: <FaHeart />,
      title: "Lễ Dạm Ngõ",
      time: "08:00 AM • 18.03.2026",
      location: "Tại tư gia nhà gái",
      map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
      description:
        "Ngày hai gia đình chính thức gặp gỡ, cùng trò chuyện và mở đầu cho hành trình nên duyên của Khánh Hưng & Trang Trang.",
    },

    {
      icon: <FaHeart />,
      title: "Lễ Ăn Hỏi",
      time: "08:00 AM • 18.01.2027",
      location: "Tại tư gia nhà gái",
      map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
      description:
        "Những sính lễ được trao gửi cùng lời thưa chuyện chân thành, đánh dấu ngày đôi bên chính thức hẹn ước trăm năm.",
    },

    {
      icon: <FaChurch />,
      title: "Thánh Lễ Hôn Phối",
      time: "09:00 AM • 20.01.2027",
      location: "Nhà thờ giáo xứ Đồng Quan",
      map: "https://maps.app.goo.gl/qgz9At8wYAMLviVA8",
      description:
        "Khoảnh khắc thiêng liêng khi Khánh Hưng & Trang Trang cùng nắm tay nhau tuyên hứa trước Chúa và gia đình hai bên.",
    },

    {
      icon: <FaGlassCheers />,
      title: "Lễ Thành Hôn & Tiệc Cưới",
      time: "11:00 AM • 20.01.2027",
      location: "Tại tư gia nhà trai",
      map: "https://maps.app.goo.gl/p7adbek3JrYSdqJM9",
      description:
        "Một bữa tiệc ấm cúng để cùng nâng ly chúc mừng, lưu giữ những tiếng cười và khoảnh khắc hạnh phúc bên người thân, bạn bè.",
    },
  ];

  return (
    <section className="romantic-timeline">
      {/* FLOATING HEARTS */}

      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BLUR BACKGROUND */}

      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      <div className="timeline-container">
        {/* HEADER */}

        <motion.div
          className="timeline-header"
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
          <span className="timeline-tag">WEDDING TIMELINE</span>

          <h2>Lịch Trình Sự Kiện</h2>

          <div className="timeline-line"></div>

          <p>
            Hành trình yêu thương sẽ được viết tiếp bằng những khoảnh khắc đáng
            nhớ nhất 🤍
          </p>
        </motion.div>

        {/* TIMELINE */}

        <div className="timeline-wrapper">
          {/* CENTER LINE */}

          <motion.div
            className="center-line"
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
            }}
          />

          {timelineData.map((item, index) => (
            <motion.div
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              key={index}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
            >
              {/* ICON */}

              <motion.div
                className="timeline-icon"
                whileHover={{
                  scale: 1.1,
                }}
              >
                {item.icon}
              </motion.div>

              {/* CARD */}

              <motion.div
                className="timeline-card"
                whileHover={{
                  y: -8,
                }}
              >
                <span className="event-time">{item.time}</span>

                <h3>{item.title}</h3>

                <p className="event-desc">{item.description}</p>

                <div className="event-location">
                  <FaMapMarkerAlt />

                  <span>{item.location}</span>
                </div>

                <a
                  href={item.map}
                  target="_blank"
                  rel="noreferrer"
                  className="map-btn"
                >
                  <FaMapMarkerAlt />
                  Xem bản đồ
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
