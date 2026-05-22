import React from "react";
import { motion } from "framer-motion";
import { GiBigDiamondRing } from "react-icons/gi";
import "./WeddingInfo.css";

const WeddingInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="wedding-luxury-section">
      {/* Các khối màu mờ tạo chiều sâu background */}
      <div className="luxury-blur-glow static-pink"></div>
      <div className="luxury-blur-glow static-cream"></div>

      <motion.div
        className="luxury-card"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Đường line khung mảnh nghệ thuật */}
        <div className="inner-frame-line"></div>

        {/* --- KHỐI TIÊU ĐỀ --- */}
        <motion.div variants={itemVariants} className="luxury-header">
          <span className="gold-tag">THE WEDDING INVITATION</span>
          <h2 className="luxury-title">Lễ Thành Hôn</h2>
          <div className="luxury-badge-date">January — 2027</div>
        </motion.div>

        {/* --- KHỐI ĐẠI DIỆN HAI BÊN (Bố cục gọn gàng hơn) --- */}
        <div className="luxury-parents-grid">
          <motion.div variants={itemVariants} className="parent-column">
            <span className="side-label">Họ Nhà Trai</span>
            <p className="parent-names">
              Ông Bà: <strong>Trần Khánh Duy</strong>
            </p>
            <p className="parent-names">
              <strong>Nguyễn Thị Thịnh</strong>
            </p>
            <span className="parent-address">
              📍 Thôn Phụng Thượng, xã Vũ Quý, tỉnh Hưng Yên
            </span>
          </motion.div>

          <div className="center-vertical-line"></div>

          <motion.div variants={itemVariants} className="parent-column">
            <span className="side-label">Họ Nhà Gái</span>
            <p className="parent-names">
              Ông Bà: <strong>Nguyễn Ngọc Ánh</strong>
            </p>
            <p className="parent-names">
              <strong>Đoàn Thị Thìn</strong>
            </p>
            <span className="parent-address">
              📍 Thôn Đông, xã Kiến Xương, tỉnh Hưng Yên
            </span>
          </motion.div>
        </div>

        {/* --- KHỐI TÊN NHÂN VẬT CHÍNH (Tạo bứt phá thị giác) --- */}
        <motion.div variants={itemVariants} className="luxury-couple-wrapper">
          <div className="luxury-name-block">
            <h3 className="luxury-name groom">Khánh Hưng</h3>
            <span className="luxury-role">TRƯỞNG NAM</span>
          </div>

          <div className="luxury-center-rings">
            <div className="ring-pulse-bg"></div>
            <GiBigDiamondRing className="luxury-ring-icon" />
          </div>

          <div className="luxury-name-block">
            <h3 className="luxury-name bride">Trang Trang</h3>
            <span className="luxury-role">ÚT NỮ</span>
          </div>
        </motion.div>

        {/* --- KHỐI THỜI GIAN (Phong cách thiết kế Thụy Sĩ) --- */}
        <motion.div variants={itemVariants} className="luxury-time-block">
          <p className="location-announce">CỬ HÀNH TẠI TƯ GIA ĐẠI GIA ĐÌNH</p>
          <div className="time-accent-display">VÀO LÚC 09 GIỜ 00 PHÚT SÁNG</div>

          <div className="editorial-calendar">
            <div className="cal-element day-text">CHỦ NHẬT</div>
            <div className="cal-element main-number">10</div>
            <div className="cal-element month-year">
              <span className="m-text">THÁNG 01</span>
              <span className="y-text">2027</span>
            </div>
          </div>

          <div className="lunar-glass-pill">
            <span>Tức ngày 3 tháng 12 năm Bính Ngọ</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WeddingInfo;
