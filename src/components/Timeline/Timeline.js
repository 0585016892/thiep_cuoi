import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaChurch,
  FaCalendarCheck,
  FaDirections,
} from "react-icons/fa";
import "./Timeline.css";

function Timeline() {
  const timelineData = [
    {
      icon: <FaHeart />,
      title: "Lễ Dạm Ngõ",
      time: "08:00 AM • 18.03.2026",
      location: "Tư gia nhà gái",
      map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
      description: "Gặp gỡ hai gia đình, khởi đầu chuyện chung đôi.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Lễ Ăn Hỏi",
      time: "08:00 AM • 26.12.2026",
      location: "Tư gia nhà gái",
      map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
      description: "Trao gửi sính lễ, đính ước tình yêu trăm năm.",
    },
    {
      icon: <FaChurch />,
      title: "Thánh Lễ Hôn Phối",
      time: "09:00 AM • 27.12.2026",
      location: "Giáo xứ Đồng Quan",
      map: "https://maps.app.goo.gl/qgz9At8wYAMLviVA8",
      description: "Nguyện hứa thủy chung trước Thiên Chúa & gia đình.",
    },
    {
      icon: <FaGlassCheers />,
      title: "Tiệc Cưới",
      time: "11:00 AM • 27.12.2026",
      location: "Tư gia nhà trai",
      map: "https://maps.app.goo.gl/p7adbek3JrYSdqJM9",
      description: "Bữa tiệc ấm cúng, nâng ly chúc mừng hạnh phúc.",
    },
  ];

  return (
    <section className="compact-v-timeline-section">
      <div className="compact-v-container">
        {/* HEADER SIÊU GỌN */}
        <motion.div
          className="v-timeline-header"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="wishes-badge-tag">
            <span className="dot"></span>
            <span>WEDDING TIMELINE</span>
            <span className="dot"></span>
          </div>

          <h2 className="wishes-title">Sổ Lưu Bút Yêu Thương</h2>
        </motion.div>

        {/* TIMELINE TRỤC DỌC GỌN GÀNG */}
        <div className="v-timeline-wrapper">
          {/* Trục đường kẻ giữa */}
          <div className="v-center-line" />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                className={`v-timeline-item ${isLeft ? "left-side" : "right-side"}`}
                key={index}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Node Icon tròn ở giữa trục */}
                <div className="v-node-icon">{item.icon}</div>

                {/* Card nội dung thu nhỏ */}
                <div className="v-event-card">
                  <div className="v-card-header">
                    <span className="v-time-tag">{item.time}</span>
                    <h3 className="v-event-title">{item.title}</h3>
                  </div>

                  <p className="v-event-desc">{item.description}</p>

                  <div className="v-card-footer">
                    <span className="v-loc-text">
                      <FaMapMarkerAlt className="v-loc-icon" /> {item.location}
                    </span>
                    <a
                      href={item.map}
                      target="_blank"
                      rel="noreferrer"
                      className="v-map-btn"
                    >
                      <FaDirections /> Maps
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
