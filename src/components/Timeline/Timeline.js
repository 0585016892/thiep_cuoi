import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaChurch,
  FaCalendarCheck,
  FaDirections,
} from "react-icons/fa";
import { layKhach } from "../../api/guestApi"; // Sửa đường dẫn theo dự án của m
import "./Timeline.css";

const TIMELINE_NHA_TRAI = [
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
    time: "14:00 • 26.12.2026 • 18/11/2026 Âm lịch",
    location: "Tư gia nhà gái",
    map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
    description: "Trao gửi sính lễ, đính ước tình yêu trăm năm.",
  },
  {
    icon: <FaChurch />,
    title: "Thánh Lễ Hôn Phối",
    time: "07:00 AM • 26.12.2026",
    location: "Giáo xứ Đồng Quan",
    map: "https://maps.app.goo.gl/qgz9At8wYAMLviVA8",
    description: "Nguyện hứa thủy chung trước Thiên Chúa & gia đình.",
  },
  {
    icon: <FaGlassCheers />,
    title: "Tiệc Cưới - Lễ Thành Hôn",
    time: "08:00 AM • 27.12.2026",
    location: "Tư gia nhà trai",
    map: "https://maps.app.goo.gl/p7adbek3JrYSdqJM9",
    description: "Bữa tiệc ấm cúng, nâng ly chúc mừng hạnh phúc.",
  },
];

// Điền thời gian và địa điểm thực tế của nhà gái vào đây.
const TIMELINE_NHA_GAI = [
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
    time: "14:00 • 26.12.2026 • 18/11/2026 Âm lịch",
    location: "Tư gia nhà gái",
    map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
    description: "Trao gửi sính lễ, đính ước tình yêu trăm năm.",
  },
  {
    icon: <FaChurch />,
    title: "Thánh Lễ Hôn Phối",
    time: "07:00 AM • 26.12.2026",
    location: "Giáo xứ Đồng Quan",
    map: "https://maps.app.goo.gl/qgz9At8wYAMLviVA8",
    description: "Nguyện hứa thủy chung trước Thiên Chúa & gia đình.",
  },
  {
    icon: <FaGlassCheers />,
    title: "Tiệc Cưới - Lễ Thành Hôn",
    time: "Thời gian tiệc nhà gái",
    location: "Tư gia nhà gái",
    map: "https://www.google.com/maps?q=20.392352741369223,106.402550805051",
    description: "Bữa tiệc ấm cúng, nâng ly chúc mừng hạnh phúc.",
  },
];

function Timeline() {
  const [laKhachNhaGai, setLaKhachNhaGai] = useState(false);
  const [dangTaiKhach, setDangTaiKhach] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("guest");

    if (!guestId) {
      setDangTaiKhach(false);
      return;
    }

    let cancelled = false;

    layKhach(guestId)
      .then((data) => {
        if (cancelled) return;

        if (data?.thanhCong && data?.khach) {
          const quanHe = String(data.khach.quanHe || "")
            .trim()
            .toLowerCase();

          setLaKhachNhaGai(quanHe === "bạn cô dâu");
        }
      })
      .catch((error) => {
        console.error("Không thể lấy thông tin khách mời:", error);
      })
      .finally(() => {
        if (!cancelled) setDangTaiKhach(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Tránh hiển thị nhầm dữ liệu nhà trai khi đang tải thông tin khách.
  if (dangTaiKhach) return null;

  const timelineData = laKhachNhaGai ? TIMELINE_NHA_GAI : TIMELINE_NHA_TRAI;

  return (
    <section className="compact-v-timeline-section">
      <div className="compact-v-container">
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

        <div className="v-timeline-wrapper">
          <div className="v-center-line" />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                className={`v-timeline-item ${
                  isLeft ? "left-side" : "right-side"
                }`}
                key={index}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="v-node-icon">{item.icon}</div>

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
