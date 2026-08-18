import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRing,
  FaCompass,
  FaStar,
  FaFeatherAlt,
} from "react-icons/fa";
import "./LoveStory.css";

function LoveStory() {
  const stories = [
    {
      num: "01",
      icon: <FaCompass />,
      year: "18 . 03 . 2022",
      title: "Lần Đầu Gặp Gỡ",
      desc: "Một buổi tối rất bình thường, cả hai vô tình gặp nhau trong một quán nước nhỏ. Chẳng ai ngờ rằng ly nước hôm ấy lại là khởi đầu cho một câu chuyện dài thật đẹp. Từ vài câu hỏi thăm xã giao, chúng mình nói chuyện quên cả giờ về — như thể đã quen nhau từ rất lâu rồi vậy.",
    },
    {
      num: "02",
      icon: <FaHeart />,
      year: "22 . 05 . 2022",
      title: "Lời Tỏ Tình",
      desc: "Sau những ngày nhắn tin tới khuya, những lần quan tâm vụng về và vô số cái cớ để được gặp nhau… cuối cùng Khánh Hưng cũng lấy hết can đảm để nói lời yêu. Không cần hoa hay điều gì quá lớn lao, chỉ cần một câu 'Hay mình yêu nhau nhé?' cũng đủ khiến trái tim ai đó rung động mãi về sau 🤍",
    },
    {
      num: "03",
      icon: <FaStar />,
      year: "2023 - 2025",
      title: "Những Năm Tháng Đồng Hành",
      desc: "Chúng mình cùng nhau đi qua rất nhiều điều nhỏ bé trong cuộc sống — những buổi cà phê quen thuộc, những lần giận hờn trẻ con, những chuyến đi ngắn ngày và cả những lúc mệt mỏi nhất. Càng trưởng thành, cả hai càng hiểu rằng tình yêu không chỉ là rung động, mà còn là sự kiên nhẫn và cùng nhau cố gắng mỗi ngày.",
    },
    {
      num: "04",
      icon: <FaRing />,
      year: "18 . 03 . 2026",
      title: "Ngày Dặm Ngõ",
      desc: "Sau 4 năm kể từ lần đầu gặp gỡ, chúng mình chính thức đưa câu chuyện tình yêu ấy về với gia đình hai bên. Một ngày thật đặc biệt — không còn là hai người yêu nhau đơn thuần nữa, mà là hai gia đình cùng ngồi lại, cùng vun vén cho một tương lai mang tên 'chúng ta'.",
    },
    {
      num: "05",
      icon: <FaHeart />,
      year: "27 . 12 . 2026",
      title: "Ngày Chung Đôi",
      desc: "Và rồi ngày hạnh phúc nhất cũng đến ✨ Sau tất cả những yêu thương, chờ đợi và đồng hành, Khánh Hưng & Trang Trang chính thức nắm tay nhau bước sang một chương mới của cuộc đời — nơi mỗi ngày thức dậy đều có nhau bên cạnh.",
    },
  ];

  return (
    <section className="sage-story-section">
      {/* Background Soft Glows */}
      <div className="story-glow glow-top"></div>
      <div className="story-glow glow-bottom"></div>

      <div className="story-content-wrapper">
        {/* HEADER */}
        <motion.div
          className="editorial-story-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="story-badge-tag">
            <span className="dot"></span>
            <span>OUR LOVE STORY</span>
            <span className="dot"></span>
          </div>

          <h2 className="story-title">Hành Trình Yêu Thương</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="story-subtitle">
            Từ những điều bình dị nhất, chúng mình đã cùng nhau viết nên một
            hành trình thật đẹp 🤍
          </p>
        </motion.div>

        {/* HORIZONTAL MAGAZINE LAYOUT */}
        <div className="editorial-horizontal-list">
          {stories.map((item, index) => {
            const isOffset = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                className={`horizontal-story-card ${isOffset ? "card-offset" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                {/* BIG BACKGROUND NUMBER */}
                <span className="bg-big-num">{item.num}</span>

                {/* LEFT COLUMN: META & TITLE */}
                <div className="card-left-meta">
                  <div className="card-header-top">
                    <div className="card-icon-pill">{item.icon}</div>
                    <span className="card-date-badge">
                      <FaFeatherAlt className="feather" /> {item.year}
                    </span>
                  </div>
                  <h3 className="horizontal-card-title">{item.title}</h3>
                </div>

                {/* RIGHT COLUMN: DESCRIPTION CONTENT */}
                <div className="card-right-desc">
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LoveStory;
