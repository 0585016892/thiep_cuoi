import React, { useState } from "react";

import { motion } from "framer-motion";

import { FiZoomIn, FiHeart } from "react-icons/fi";

import { FaHeart } from "react-icons/fa";

import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

import "./Gallery.css";

function Gallery() {
  const [index, setIndex] = useState(-1);

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

  return (
    <section className="romantic-gallery">
      {/* FLOATING HEARTS */}

      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BLUR */}

      <div className="gallery-blur blur1"></div>
      <div className="gallery-blur blur2"></div>

      <div className="gallery-container">
        {/* HEADER */}

        <motion.div
          className="gallery-header"
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
          <div className="gallery-icon">
            <FiHeart />
          </div>

          <span className="gallery-tag">OUR MEMORIES</span>

          <h2>Khoảnh Khắc Hạnh Phúc</h2>

          <div className="gallery-divider"></div>

          <p>
            Những khoảnh khắc đẹp nhất của chúng mình được lưu giữ bằng tất cả
            yêu thương 🤍
          </p>
        </motion.div>

        {/* GRID */}

        <div className="gallery-grid">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`gallery-item item-${i}`}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
              }}
              whileHover={{
                y: -10,
              }}
              onClick={() => setIndex(i)}
            >
              <div className="image-wrapper">
                <img src={img.src} alt={`Gallery ${i}`} />

                {/* OVERLAY */}

                <div className="gallery-overlay">
                  <motion.div
                    className="overlay-content"
                    whileHover={{
                      scale: 1.05,
                    }}
                  >
                    <FiZoomIn />

                    <span>Xem ảnh</span>
                  </motion.div>
                </div>

                {/* HEART */}

                <div className="corner-heart">
                  <FaHeart />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images}
        styles={{
          container: {
            background: "rgba(255,250,252,0.96)",

            backdropFilter: "blur(18px)",
          },

          button: {
            color: "#b76e79",
          },

          navigationPrev: {
            color: "#d88ba1",
          },

          navigationNext: {
            color: "#d88ba1",
          },
        }}
      />
    </section>
  );
}

export default Gallery;
