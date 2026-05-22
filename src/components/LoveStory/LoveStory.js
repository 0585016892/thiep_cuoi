import React from "react";
import { motion } from "framer-motion";

import {
  FaHeart,
  FaRing,
  FaCompass,
  FaStar,
  FaCameraRetro,
} from "react-icons/fa";

import "./LoveStory.css";

function LoveStory() {
  const stories = [
    {
      icon: <FaCompass />,
      year: "18 . 03 . 2022",
      title: "Lần Đầu Gặp Gỡ",
      desc: "Một buổi tối rất bình thường, cả hai vô tình gặp nhau trong một quán nước nhỏ. Chẳng ai ngờ rằng ly nước hôm ấy lại là khởi đầu cho một câu chuyện dài thật đẹp. Từ vài câu hỏi thăm xã giao, chúng mình nói chuyện quên cả giờ về — như thể đã quen nhau từ rất lâu rồi vậy.",
    },

    {
      icon: <FaHeart />,
      year: "22 . 05 . 2022",
      title: "Lời Tỏ Tình",
      desc: "Sau những ngày nhắn tin tới khuya, những lần quan tâm vụng về và vô số cái cớ để được gặp nhau… cuối cùng Khánh Hưng cũng lấy hết can đảm để nói lời yêu. Không cần hoa hay điều gì quá lớn lao, chỉ cần một câu 'Hay mình yêu nhau nhé?' cũng đủ khiến trái tim ai đó rung động mãi về sau ❤️",
    },

    {
      icon: <FaStar />,
      year: "2023 - 2025",
      title: "Những Năm Tháng Đồng Hành",
      desc: "Chúng mình cùng nhau đi qua rất nhiều điều nhỏ bé trong cuộc sống — những buổi cà phê quen thuộc, những lần giận hờn trẻ con, những chuyến đi ngắn ngày và cả những lúc mệt mỏi nhất. Càng trưởng thành, cả hai càng hiểu rằng tình yêu không chỉ là rung động, mà còn là sự kiên nhẫn và cùng nhau cố gắng mỗi ngày.",
    },

    {
      icon: <FaRing />,
      year: "18 . 03 . 2026",
      title: "Ngày Dặm Ngõ",
      desc: "Sau 4 năm kể từ lần đầu gặp gỡ, chúng mình chính thức đưa câu chuyện tình yêu ấy về với gia đình hai bên. Một ngày thật đặc biệt — không còn là hai người yêu nhau đơn thuần nữa, mà là hai gia đình cùng ngồi lại, cùng vun vén cho một tương lai mang tên 'chúng ta'.",
    },

    {
      icon: <FaHeart />,
      year: "10 . 01 . 2027",
      title: "Ngày Chung Đôi",
      desc: "Và rồi ngày hạnh phúc nhất cũng đến ✨ Sau tất cả những yêu thương, chờ đợi và đồng hành, Khánh Hưng & Trang Trang chính thức nắm tay nhau bước sang một chương mới của cuộc đời — nơi mỗi ngày thức dậy đều có nhau bên cạnh.",
    },
  ];
  return (
    <section className="romantic-story">
      {/* FLOATING HEARTS */}

      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BLUR BACKGROUND */}

      <div className="story-blur blur1"></div>
      <div className="story-blur blur2"></div>

      <div className="story-container">
        {/* HEADER */}

        <motion.div
          className="story-header"
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
          <div className="story-icon">
            <FaCameraRetro />
          </div>

          <span className="story-tag">OUR LOVE STORY</span>

          <h2>Câu Chuyện Tình Yêu</h2>

          <div className="story-divider"></div>

          <p>
            Từ những điều bình dị nhất, chúng mình đã cùng nhau viết nên một
            hành trình thật đẹp 🤍
          </p>
        </motion.div>

        {/* TIMELINE */}

        <div className="story-timeline">
          {/* CENTER LINE */}

          <motion.div
            className="story-line"
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          />

          {stories.map((item, index) => (
            <motion.div
              key={index}
              className={`story-item ${index % 2 === 0 ? "left" : "right"}`}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
            >
              {/* ICON */}

              <motion.div
                className="story-badge"
                whileHover={{
                  scale: 1.08,
                }}
              >
                {item.icon}
              </motion.div>

              {/* CARD */}

              <motion.div
                className="story-card"
                whileHover={{
                  y: -8,
                }}
              >
                <span className="story-year">{item.year}</span>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LoveStory;
