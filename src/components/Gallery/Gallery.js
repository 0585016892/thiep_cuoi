import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiZoomIn } from "react-icons/fi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./Gallery.css";

function Gallery() {
  const [index, setIndex] = useState(-1);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1974&auto=format&fit=crop",
      title: "Khoảnh Khắc Đáng Nhớ",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1974&auto=format&fit=crop",
      title: "Hành Trình Yêu Thương",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop",
      title: "Ngày Chung Đôi",
    },
    {
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1974&auto=format&fit=crop",
      title: "Nụ Cười An Yên",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1974&auto=format&fit=crop",
      title: "Bên Nhau Bình Yên",
    },
    {
      src: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21d?q=80&w=1974&auto=format&fit=crop",
      title: "Trọn Vẹn Ước Mơ",
    },
  ];

  return (
    <section className="sage-gallery-section">
      {/* Background Soft Glow */}
      <div className="gallery-blur-glow blur-left"></div>
      <div className="gallery-blur-glow blur-right"></div>

      <div className="gallery-content-wrapper">
        {/* HEADER SECTION */}
        <motion.div
          className="editorial-gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gallery-badge">
            <span className="dot"></span>
            <span>SWEET MEMORIES</span>
            <span className="dot"></span>
          </div>

          <h2 className="gallery-title">Khoảnh Khắc Hạnh Phúc</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="gallery-subtitle">
            Những góc ảnh lưu giữ tình yêu nhẹ nhàng, bình yên và trọn vẹn nhất
            của chúng mình 🤍
          </p>
        </motion.div>

        {/* EDITORIAL MASONRY GRID */}
        <div className="gallery-masonry-grid">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`gallery-card card-layout-${i}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setIndex(i)}
            >
              <div className="image-frame">
                <img src={img.src} alt={img.title} loading="lazy" />

                {/* OVERLAY ON HOVER */}
                <div className="card-overlay">
                  <div className="overlay-info">
                    <span className="view-btn">
                      <FiZoomIn className="zoom-icon" /> Phóng to
                    </span>
                    <p className="image-caption">{img.title}</p>
                  </div>
                </div>

                {/* Corner Tag Decor */}
                <div className="frame-corner-tag">
                  <span>0{i + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX POPUP */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images}
        styles={{
          container: {
            background: "rgba(248, 250, 247, 0.96)",
            backdropFilter: "blur(20px)",
          },
          button: {
            color: "#6b7c67",
          },
          navigationPrev: {
            color: "#242c24",
          },
          navigationNext: {
            color: "#242c24",
          },
        }}
      />
    </section>
  );
}

export default Gallery;
