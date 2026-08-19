import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Navigation,
  Sparkles,
  Heart,
  Shirt,
} from "lucide-react";
import "./Footer.css";

export default function FooterWedding() {
  return (
    <footer className="arch-footer-section">
      {/* Soft Radial Ambient Lights */}
      <div className="arch-ambient ambient-1"></div>
      <div className="arch-ambient ambient-2"></div>

      <div className="arch-footer-container">
        {/* ARCH DOME HEADER */}
        <motion.div
          className="arch-header-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="arch-badge-tag">
            <span className="dot"></span>
            <span>WEDDING CELEBRATION</span>
            <span className="dot"></span>
          </div>

          <h1 className="arch-couple-title">
            Khánh Hưng <span className="ampersand">&</span> Trang Trang
          </h1>

          <p className="arch-quote">
            “Sự gì Thiên Chúa đã kết hợp, loài người không được phân ly.”
          </p>

          <div className="arch-date-pill">
            <CalendarDays size={16} />
            <span>27 . 12 . 2026</span>
          </div>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="arch-content-grid">
          {/* LEFT: DETAILS & DRESSCODE */}
          <motion.div
            className="arch-details-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* ITEM 1: DATE */}
            <div className="arch-info-block">
              <div className="info-icon-badge">
                <CalendarDays size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Thời Gian</span>
                <h4>Chủ Nhật, 27 Tháng 12, 2027</h4>
                <p>Đón khách: 8:30 AM — Khai tiệc: 9:00 AM</p>
              </div>
            </div>

            {/* ITEM 2: VENUE */}
            <div className="arch-info-block">
              <div className="info-icon-badge">
                <MapPin size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Địa Điểm Tổ Chức</span>
                <h4>Tư Gia Nhà Nam</h4>
                <p>Xã Vũ Quý, tỉnh Hưng Yên</p>
              </div>
            </div>

            {/* ITEM 3: DRESSCODE */}
            <div className="arch-info-block">
              <div className="info-icon-badge">
                <Shirt size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Trang Phục Ưu Tiên</span>
                <h4>Be, Trắng Kem, Xanh Sage</h4>
                <p>Trang trọng & Lịch sự</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: MAP & DIRECT NAVIGATION */}
          <motion.div
            className="arch-map-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="arch-map-card">
              <div className="map-card-top">
                <span className="map-title">
                  <Navigation size={15} /> Vị Trí Tiệc Cưới
                </span>
                <a
                  href="https://maps.google.com/?q=20.420832,106.402754"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-open-map"
                >
                  Mở Google Maps
                </a>
              </div>

              <div className="arch-map-frame">
                <iframe
                  title="wedding-location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1016.3186585439761!2d106.40275426959623!3d20.42083225564106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI1JzE1LjAiTiAxMDbCsDI0JzEyLjIiRQ!5e1!3m2!1svi!2s!4v1779352518614!5m2!1svi!2s"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FOOTER BOTTOM NOTE */}
        <div className="arch-footer-bottom">
          <div className="thank-message">
            <Sparkles size={16} className="sparkle" />
            <span>
              Sự hiện diện của quý vị là niềm may mắn & hạnh phúc lớn nhất của
              chúng mình 🤍
            </span>
          </div>

          <div className="copyright">
            Design with{" "}
            <Heart size={13} fill="currentColor" className="heart" /> by{" "}
            <strong>Khánh Hưng</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
