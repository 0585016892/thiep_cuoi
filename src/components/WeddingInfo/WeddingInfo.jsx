import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { GiRing } from "react-icons/gi";
import "./WeddingInfo.css";

const WeddingInfo = () => {
  return (
    <section className="wedding-arch-section">
      {/* Họa tiết lá nhạt làm nền */}
      <div className="bg-leaf-pattern"></div>

      <motion.div
        className="arch-card-container"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Khung viền vòm trang trí */}
        <div className="arch-inner-border"></div>

        {/* --- HEADER --- */}
        <div className="arch-header">
          <span className="sub-title-tag">SAVE OUR DATE</span>
          <h2 className="main-title">Trân Trọng Báo Tin</h2>
          <div className="header-divider">
            <span className="line"></span>
            <span className="leaf-symbol">🌿</span>
            <span className="line"></span>
          </div>
        </div>

        {/* --- KHỐI THÔNG TIN HAI HỌ --- */}
        <div className="families-container">
          <div className="family-box groom-family">
            <span className="family-title">HỌ NHÀ TRAI</span>
            <p className="parents-name">
              Ông: <strong>Trần Khánh Duy</strong>
            </p>
            <p className="parents-name">
              Bà: <strong>Nguyễn Thị Thịnh</strong>
            </p>
            <p className="family-location">
              <FaMapMarkerAlt className="mini-icon" /> Thôn 3, xã Vũ Quý, tỉnh
              Hưng Yên
            </p>
            <p className="family-location" style={{ fontSize: "11px" }}>
              <FaMapMarkerAlt className="mini-icon" /> Thôn Phụng Thượng, xã Vũ
              An, tỉnh Thái Bindh
            </p>
          </div>

          <div className="family-center-icon">
            <GiRing className="wedding-ring-icon" />
          </div>

          <div className="family-box bride-family">
            <span className="family-title">HỌ NHÀ GÁI</span>
            <p className="parents-name">
              Ông: <strong>Nguyễn Ngọc Ánh</strong>
            </p>
            <p className="parents-name">
              Bà: <strong>Đoàn Thị Thìn</strong>
            </p>
            <p className="family-location">
              <FaMapMarkerAlt className="mini-icon" /> Thôn Ngái Đông, xã Quang
              Bình, tỉnh Hưng Yên
            </p>
            <p className="family-location" style={{ fontSize: "11px" }}>
              <FaMapMarkerAlt className="mini-icon" /> Thôn Đông, xã Quang Bình,
              tỉnh Thái Bình
            </p>
          </div>
        </div>

        {/* --- TÊN CÔ DÂU CHÚ RỂ --- */}
        <div className="hero-couple-names">
          <div className="person-block">
            <span className="person-role">TRƯỞNG NAM</span>
            <h3 className="person-name">Khánh Hưng</h3>
          </div>

          <span className="couple-ampersand">&</span>

          <div className="person-block">
            <span className="person-role">ÚT NỮ</span>
            <h3 className="person-name">Trang Trang</h3>
          </div>
        </div>

        {/* --- THỜI GIAN & ĐỊA ĐIỂM CỬ HÀNH --- */}
        <div className="event-details-card">
          <p className="venue-header">
            LỄ THÀNH HÔN CỬ HÀNH TẠI TƯ GIA NHÀ TRAI
          </p>

          <div className="event-time-badge">
            <FaClock className="time-icon" />
            <span>09:00 SÁNG</span>
          </div>

          {/* Khung ngày tháng dạng Lịch tối giản */}
          <div className="minimal-date-display">
            <div className="date-col text-col">CHỦ NHẬT</div>
            <div className="date-col number-col">27</div>
            <div className="date-col text-col">
              <span>THÁNG 12</span>
              <span className="year-sub">2026</span>
            </div>
          </div>

          <div className="lunar-pill">
            <FaCalendarAlt className="lunar-icon" />
            <span>Tức ngày 19/11/2026 (Âm lịch Bính Ngọ)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WeddingInfo;
