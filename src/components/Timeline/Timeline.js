import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaGlassCheers, FaRing, FaMapMarkerAlt } from "react-icons/fa";
import "./Timeline.css";

function Timeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const timelineData = [
    {
      icon: <FaHeart />,
      title: "Lễ Ăn Hỏi",
      time: "08:00 AM - 18.01.2027",
      location: "Tại tư gia nhà gái",
      map: "https://maps.app.goo.gl/Wf1Fopbw9sWoW8Ab7",
    },
    {
      icon: <FaRing />,
      title: "Lễ Thành Hôn",
      time: "09:00 AM - 20.01.2027",
      location: "Nhà thờ giáo xứ",
      map: "https://maps.app.goo.gl/qgz9At8wYAMLviVA8",
    },
    {
      icon: <FaGlassCheers />,
      title: "Tiệc Cưới",
      time: "11:00 AM - 20.01.2027",
      location: "Tại tư gia nhà trai",
      map: "https://maps.app.goo.gl/p7adbek3JrYSdqJM9",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const cardVariants = (index) => {
    if (isMobile) {
      // Trên Mobile: Trượt nhẹ nhàng từ phải qua trái đồng đều
      return {
        hidden: { opacity: 0, x: 40 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };
    }
    // Trên PC: Thẻ chẵn trượt từ trái (-60px), thẻ lẻ trượt từ phải (60px) cực sang
    return {
      hidden: { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 14,
          duration: 0.7,
        },
      },
    };
  };

  return (
    <section className="luxury-timeline-section">
      <div className="timeline-container">
        {/* Header đồng bộ phong cách Luxury */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="timeline-header"
        >
          <span className="timeline-tag">WEDDING PROGRAM</span>
          <h2 className="timeline-main-title">Lịch Trình Sự Kiện</h2>
          <div className="timeline-title-divider"></div>
        </motion.div>

        {/* Khung chứa dòng thời gian */}
        <motion.div
          className="luxury-timeline-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} // Cuộn lên/xuống liên tục kích hoạt lại motion
        >
          {/* Trục đứng trung tâm vẽ từ trên xuống */}
          <motion.div
            className="timeline-main-line"
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: { duration: 1.2, ease: "easeInOut" },
              },
            }}
          />

          {timelineData.map((item, index) => (
            <div
              className={`luxury-timeline-item ${index % 2 === 0 ? "pc-left" : "pc-right"}`}
              key={index}
            >
              {/* Vòng tròn chứa Icon biểu tượng */}
              <motion.div
                className="luxury-timeline-badge"
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: { delay: index * 0.15, duration: 0.4 },
                  },
                }}
              >
                {item.icon}
              </motion.div>

              {/* Hộp nội dung chi tiết */}
              <motion.div
                className="luxury-timeline-content"
                variants={cardVariants(index)}
              >
                <h3 className="event-title">{item.title}</h3>
                <span className="event-time">{item.time}</span>
                <p className="event-location">{item.location}</p>

                <a
                  href={item.map}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-map-btn"
                >
                  <FaMapMarkerAlt className="btn-icon" />
                  Xem Bản Đồ
                </a>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Timeline;
