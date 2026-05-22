import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiZoomIn } from "react-icons/fi"; // Thay icon maximize bằng icon kính lúp sang trọng

// Thư viện Lightbox cao cấp
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Đừng quên copy dòng này!

import "./Gallery.css";

function Gallery() {
  const [index, setIndex] = useState(-1); // Quản lý ảnh đang được mở

  const images = [
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1974&auto=format&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1974&auto=format&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1974&auto=format&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1974&auto=format&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21d?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="luxury-gallery-section">
      <div className="gallery-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="gallery-header"
        >
          <span className="gallery-tag">VISUAL MEMORIES</span>
          <h2 className="gallery-main-title">Khoảnh Khắc Hạnh Phúc</h2>
          <div className="gallery-title-divider"></div>
        </motion.div>

        {/* Lưới Bento Grid */}
        <motion.div
          className="luxury-bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`bento-item item-style-${i}`}
              variants={itemVariants}
              onClick={() => setIndex(i)} // Kích hoạt Lightbox khi click
              whileTap={{ scale: 0.98 }} // Hiệu ứng nhấn mượt
            >
              <div className="image-overflow-shield">
                <img
                  src={img.src}
                  alt={`Wedding moment ${i + 1}`}
                  className="gallery-img"
                />

                {/* Lớp phủ hover cao cấp */}
                <div className="gallery-premium-overlay">
                  <div className="overlay-blur-card">
                    <FiZoomIn className="zoom-icon" />
                    <span className="overlay-text">Xem ảnh</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- CẤU HÌNH LIGHTBOX TOÀN MÀN HÌNH --- */}
      <Lightbox
        index={index}
        slides={images}
        open={index >= 0}
        close={() => setIndex(-1)} // Đóng Lightbox
        // Tùy chỉnh CSS cho Lightbox sang trọng (Tone Trắng hồng mờ)
        styles={{
          container: {
            background: "rgba(255, 250, 255, 0.95)",
            backdropFilter: "blur(15px)",
          },
          toolbar: { background: "transparent" },
          button: { color: "#2d2d2d" }, // Màu icon đen Charcoal sang trọng
          navigationPrev: { background: "transparent", color: "#f06292" },
          navigationNext: { background: "transparent", color: "#f06292" },
        }}
      />
    </section>
  );
}

export default Gallery;
