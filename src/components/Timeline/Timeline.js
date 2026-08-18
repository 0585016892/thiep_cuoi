import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaChurch,
  FaCalendarCheck,
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
        "Ngày hai gia đình chính thức gặp gỡ, trao gửi câu chuyện thân tình và khởi đầu cho chặng đường nên duyên của Khánh Hưng & Trang Trang.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Lễ Ăn Hỏi",
      time: "08:00 AM • 26.12.2026",
      location: "Tại tư gia nhà gái",
      map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
      description:
        "Những mâm sính lễ được trao gửi cùng lời thưa chuyện chân thành, đính ước tình yêu trăm năm trước hai họ.",
    },
    {
      icon: <FaChurch />,
      title: "Thánh Lễ Hôn Phối",
      time: "09:00 AM • 27.12.2026",
      location: "Nhà thờ giáo xứ Đồng Quan",
      map: "https://maps.app.goo.gl/qgz9At8wYAMLviVA8",
      description:
        "Khoảnh khắc thiêng liêng khi đôi bạn trẻ cùng nắm tay trao lời nguyện hứa thủy chung trước Thiên Chúa và gia đình.",
    },
    {
      icon: <FaGlassCheers />,
      title: "Lễ Thành Hôn & Tiệc Cưới",
      time: "11:00 AM • 27.12.2026",
      location: "Tại tư gia nhà trai",
      map: "https://maps.app.goo.gl/p7adbek3JrYSdqJM9",
      description:
        "Bữa tiệc ấm cúng cùng chung vui, nâng ly chúc mừng và lưu giữ những nụ cười trọn vẹn bên người thân, bạn bè.",
    },
  ];

  return (
    <section className="sage-timeline-section">
      {/* Background Soft Glow */}
      <div className="timeline-glow glow-1"></div>
      <div className="timeline-glow glow-2"></div>

      <div className="timeline-container">
        {/* HEADER SECTION */}
        <motion.div
          className="editorial-timeline-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="timeline-badge">
            <span className="dot"></span>
            <span>WEDDING TIMELINE</span>
            <span className="dot"></span>
          </div>

          <h2 className="timeline-title">Lịch Trình Sự Kiện</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="timeline-subtitle">
            Hành trình tình yêu được đánh dấu bằng những cột mốc đáng nhớ nhất
            🤍
          </p>
        </motion.div>

        {/* TIMELINE MAIN BODY */}
        <div className="timeline-wrapper">
          {/* TRỤC ĐƯỜNG NỐI TRUNG TÂM */}
          <motion.div
            className="editorial-center-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {timelineData.map((item, index) => (
            <motion.div
              className={`timeline-item ${index % 2 === 0 ? "left-item" : "right-item"}`}
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* NODE ICON Ở GIỮA */}
              <div className="node-icon-wrapper">
                <span className="node-icon">{item.icon}</span>
              </div>

              {/* CARD NỘI DUNG SỰ KIỆN */}
              <motion.div
                className="event-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="event-time-tag">{item.time}</div>
                <h3 className="event-title">{item.title}</h3>
                <p className="event-description">{item.description}</p>

                <div className="event-location-info">
                  <FaMapMarkerAlt className="loc-icon" />
                  <span>{item.location}</span>
                </div>

                <a
                  href={item.map}
                  target="_blank"
                  rel="noreferrer"
                  className="map-link-btn"
                >
                  <FaMapMarkerAlt /> Chỉ đường Google Maps
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
