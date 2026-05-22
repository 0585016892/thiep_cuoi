import "./Hero.css";
import { motion } from "framer-motion";
import anhcuoi from "../../assets/anhcuoi.png";
import { FaHeart } from "react-icons/fa";

function Hero() {
  return (
    <section className="luxury-hero">
      <div className="falling-hy">
        <span className="hy-item hy-1">囍</span>
        <span className="hy-item hy-2">囍</span>
        <span className="hy-item hy-3">囍</span>
        <span className="hy-item hy-4">囍</span>
        <span className="hy-item hy-5">囍</span>
        <span className="hy-item hy-6">囍</span>
        <span className="hy-item hy-7">囍</span>
        <span className="hy-item hy-8">囍</span>
      </div>
      {/* Background */}
      <img src={anhcuoi} alt="" className="hero-bg" />

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Pink Blur */}
      <div className="pink-blur"></div>

      {/* Floating petals */}
      <div className="petals">
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`petal petal-${i}`}></span>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <span className="save-date">NGÀY CHUNG ĐÔI</span>

        <div className="mini-divider">
          <div className="line"></div>

          <FaHeart className="mini-heart" />

          <div className="line"></div>
        </div>

        {/* NAMES */}
        <div className="hero-names">
          <motion.h1
            className="hero-name"
            animate={{
              y: [0, -10, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Khánh Hưng
          </motion.h1>

          <motion.div
            className="ampersand"
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            &
          </motion.div>

          <motion.h1
            className="hero-name second"
            animate={{
              y: [0, 10, 0],
              rotate: [1, -1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            Trang Trang
          </motion.h1>
        </div>

        {/* Bottom divider */}
        <div className="bottom-divider">✦</div>

        {/* Info */}
        <p className="hero-date">CHỦ NHẬT, 10 THÁNG 01 — 2027</p>

        <p className="hero-location">📍 XÃ VŨ QUÝ, TỈNH HƯNG YÊN</p>
      </motion.div>

      {/* Fade */}
      <div className="hero-fade"></div>
    </section>
  );
}

export default Hero;
