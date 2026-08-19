import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";

// Import CSS của Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "yet-another-react-lightbox/styles.css";
import "./Gallery.css";
import kiniem5 from "../../assets/anhkiniem/IMG_0413.JPG";
import kiniem6 from "../../assets/anhkiniem/IMG_1257.JPG";
import kiniem7 from "../../assets/anhkiniem/IMG_1329.JPG";
import kiniem8 from "../../assets/anhkiniem/IMG_1378.jpg";
import kiniem9 from "../../assets/anhkiniem/IMG_1405.JPG";
import kiniem10 from "../../assets/anhkiniem/IMG_2676.JPG";
import kiniem1 from "../../assets/anhkiniem/kiniem1.JPEG";
import kiniem2 from "../../assets/anhkiniem/kiniem2.JPEG";
import kiniem3 from "../../assets/anhkiniem/kiniem3.JPEG";
import kiniem4 from "../../assets/anhkiniem/kiniem4.JPEG";
function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const images = [
    {
      src: kiniem1,
      title: "Khoảnh Khắc Đáng Nhớ",
    },
    {
      src: kiniem2,
      title: "Hành Trình Yêu Thương",
    },
    {
      src: kiniem3,
      title: "Ngày Chung Đôi",
    },
    {
      src: kiniem4,
      title: "Nụ Cười An Yên",
    },
    {
      src: kiniem5,
      title: "Bên Nhau Bình Yên",
    },
    {
      src: kiniem6,
      title: "Trọn Vẹn Ước Mơ",
    },
    {
      src: kiniem7,
      title: "Ngày Chung Đôi",
    },
    {
      src: kiniem8,
      title: "Nụ Cười An Yên",
    },
    {
      src: kiniem9,
      title: "Bên Nhau Bình Yên",
    },
    {
      src: kiniem10,
      title: "Trọn Vẹn Ước Mơ",
    },
  ];

  return (
    <section className="album-gallery-section">
      <div className="album-container">
        {/* Tiêu đề */}
        <motion.div
          className="album-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="rsvp-badge">
            <span className="dot"></span>
            <span>WEDDING GALLERY</span>
            <span className="dot"></span>
          </div>

          <h2 className="wishes-title">ẢNH CƯỚI</h2>
        </motion.div>

        {/* 3D Coverflow Slider */}
        <div className="swiper-coverflow-wrapper">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0, // Giữ góc nghiêng bằng 0 để ảnh song song
              stretch: -40, // Khoảng cách ép sát các slide vào giữa
              depth: 200, // Độ sâu 3D làm ảnh hai bên chìm về sau
              modifier: 1, // Hệ số nhân độ sâu
              slideShadows: false, // Tắt bóng mặc định của Swiper để dùng shadow mềm tùy chỉnh
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="wedding-album-swiper"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="album-slide">
                <div className="slide-card" onClick={() => setLightboxIndex(i)}>
                  <img src={img.src} alt={img.title} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nút bấm Prev / Next tròn màu xám đậm */}
          <div className="custom-swiper-button-prev">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          <div className="custom-swiper-button-next">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          {/* Dấu chấm Pagination bên dưới */}
          <div className="custom-swiper-pagination"></div>
        </div>
      </div>

      {/* Lightbox khi nhấp xem phóng to */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images}
        styles={{
          container: {
            background: "rgba(20, 20, 20, 0.92)",
            backdropFilter: "blur(10px)",
          },
        }}
      />
    </section>
  );
}

export default Gallery;
