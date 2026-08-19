import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "yet-another-react-lightbox/styles.css";
import "./MemoriesGallery.css";

// Import hình ảnh kỷ niệm
import kiniem1 from "../../assets/anhkiniem/kiniem1.JPEG";
import kiniem2 from "../../assets/anhkiniem/kiniem2.JPEG";
import kiniem3 from "../../assets/anhkiniem/kiniem3.JPEG";
import kiniem4 from "../../assets/anhkiniem/kiniem4.JPEG";
import kiniem5 from "../../assets/anhkiniem/IMG_0413.JPG";
import kiniem6 from "../../assets/anhkiniem/IMG_1257.JPG";
import kiniem7 from "../../assets/anhkiniem/IMG_1329.JPG";
import kiniem8 from "../../assets/anhkiniem/IMG_1378.jpg";
import kiniem9 from "../../assets/anhkiniem/IMG_1405.JPG";
import kiniem10 from "../../assets/anhkiniem/IMG_2676.JPG";

function MemoriesGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const memoryImages = [
    {
      src: kiniem1,
      title: "Hành trình cùng nhau",
      date: "18.03.2024",
      rotate: "-3deg",
    },
    {
      src: kiniem2,
      title: "Điểm đầu tổ quốc",
      date: "22.05.2024",
      rotate: "2.5deg",
    },
    {
      src: kiniem5,
      title: "Đi xem pháo hoa",
      date: "10.08.2024",
      rotate: "-2deg",
    },
    {
      src: kiniem3,
      title: "Đi đám cưới cùng nhau nè",
      date: "14.02.2025",
      rotate: "3deg",
    },
    {
      src: kiniem6,
      title: "Dạm ngõ của chúng mình",
      date: "05.04.2025",
      rotate: "-2.5deg",
    },
    {
      src: kiniem4,
      title: "Nụ Cười An Yên",
      date: "01.06.2025",
      rotate: "2deg",
    },
    {
      src: kiniem7,
      title: "Bước tiến đầu tiên",
      date: "15.09.2025",
      rotate: "-3deg",
    },
    {
      src: kiniem8,
      title: "Tráp dạm ngõ đây",
      date: "20.10.2025",
      rotate: "2.5deg",
    },
    {
      src: kiniem9,
      title: "Hun cái!!!",
      date: "01.01.2026",
      rotate: "-2deg",
    },
    {
      src: kiniem10,
      title: "Kiếm tiền nào",
      date: "14.02.2026",
      rotate: "3deg",
    },
  ];

  return (
    <section className="clothesline-section">
      <div className="clothesline-container">
        {/* HEADER */}
        <motion.div
          className="clothesline-header"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="wishes-badge-tag">
            <span className="dot"></span>
            <span>WEDDING MEMORIES</span>
            <span className="dot"></span>
          </div>

          <h2 className="wishes-title">Dây treo kỷ niệm</h2>
        </motion.div>

        {/* KHU VỰC DÂY TREO ẢNH */}
        <div className="string-gallery-wrapper">
          {/* Đường dây thừng phai võng */}
          <div className="hanging-string"></div>

          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            grabCursor={true}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".string-btn-next",
              prevEl: ".string-btn-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 2.2, spaceBetween: 15 },
              576: { slidesPerView: 3.2, spaceBetween: 20 },
              768: { slidesPerView: 4.2, spaceBetween: 25 },
              1024: { slidesPerView: 5.2, spaceBetween: 30 },
            }}
            className="string-swiper"
          >
            {memoryImages.map((img, i) => (
              <SwiperSlide key={i} className="string-slide">
                <div
                  className="mini-polaroid-card"
                  style={{ "--rotate-deg": img.rotate }}
                  onClick={() => setLightboxIndex(i)}
                >
                  {/* Kẹp gỗ mini dán trên dây */}
                  <div className="wooden-peg"></div>

                  <div className="mini-img-wrapper">
                    <img src={img.src} alt={img.title} loading="lazy" />
                  </div>

                  <div className="mini-caption">
                    <span className="mini-title">{img.title}</span>
                    <span className="mini-date">{img.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nút điều hướng nhỏ gọn */}
          <button className="string-btn-prev">❮</button>
          <button className="string-btn-next">❯</button>
        </div>
      </div>

      {/* LIGHTBOX PHÓNG TO */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={memoryImages}
        styles={{
          container: {
            background: "rgba(16, 40, 25, 0.95)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </section>
  );
}

export default MemoriesGallery;
