import "./Hero.css";
import { motion } from "framer-motion";
import anhcuoi from "../../assets/anhcuoi.png";
function Hero() {
  return (
    <section className="hero-frosted">
      {/* Lớp nền ảnh mờ ảo toàn màn hình */}
      <div className="background-blur-container">
        <img src={anhcuoi} alt="Background" className="bg-image-blurred" />
        <div className="pink-gradient-overlay"></div>
      </div>

      <div className="hero-content-wrapper">
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          transition={{ duration: 1.5 }}
          className="glass-card"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="glass-inner"
          >
            <span className="top-label">MỪNG HẠNH PHÚC</span>

            <div className="couple-names-glass">
              <h1 className="name-main">Khánh Hưng</h1>
              <div className="heart-separator">
                <div className="h-line"></div>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ❤
                </motion.span>
                <div className="h-line"></div>
              </div>
              <h1 className="name-main">Trang Trang</h1>
            </div>

            <div className="date-location-box">
              <p className="glass-date">20 . 10 . 2024</p>
              <div className="dot-divider"></div>
              <p className="glass-location">
                Thôn Đồng Tâm, xã Vũ Quý, Tỉnh Hưng Yên
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hiệu ứng hạt bụi bay lơ lửng */}
      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
