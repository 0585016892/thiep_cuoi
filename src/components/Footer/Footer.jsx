import "./Footer.css";
import { Heart, CalendarDays, MapPinned, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

export default function FooterWedding() {
  return (
    <footer className="romantic-footer">
      {/* FLOATING HEARTS */}

      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BACKGROUND BLUR */}

      <div className="footer-blur blur-1"></div>
      <div className="footer-blur blur-2"></div>

      <div className="footer-wrapper">
        {/* TOP */}

        <motion.div
          className="footer-header"
          initial={{
            opacity: 0,
            y: 40,
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
          <div className="footer-heart">
            <Heart fill="currentColor" />
          </div>

          <span className="footer-tag">SAVE THE DATE</span>

          <h1>
            Khánh Hưng
            <span>&</span>
            Trang Trang
          </h1>

          <div className="footer-divider">
            <div className="line"></div>

            <span>10 January 2027</span>

            <div className="line"></div>
          </div>

          <p className="footer-quote">
            “Sự gì Thiên Chúa đã kết hợp, loài người không được phân ly.”
          </p>
        </motion.div>

        {/* INFO */}

        <motion.div
          className="footer-info"
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
            delay: 0.2,
          }}
        >
          <div className="info-card">
            <div className="info-icon">
              <CalendarDays size={20} />
            </div>

            <div>
              <span className="info-label">Wedding Date</span>

              <p>10 . 01 . 2027</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <MapPinned size={20} />
            </div>

            <div>
              <span className="info-label">Wedding Place</span>

              <p>Xã Vũ Quý, tỉnh Hưng Yên</p>
            </div>
          </div>
        </motion.div>

        {/* MAP */}

        <motion.div
          className="map-wrapper"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
        >
          <iframe
            title="wedding-map"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1016.3186585439761!2d106.40275426959623!3d20.42083225564106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI1JzE1LjAiTiAxMDbCsDI0JzEyLjIiRQ!5e1!3m2!1svi!2s!4v1779352518614!5m2!1svi!2s"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* THANKS */}

        <motion.div
          className="footer-thanks"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <Sparkles size={18} />

          <p>
            Cảm ơn vì đã trở thành một phần đặc biệt trong ngày trọng đại của
            chúng mình 🤍
          </p>
        </motion.div>

        {/* BOTTOM */}

        <div className="footer-bottom">
          Handmade with
          <Heart size={14} fill="currentColor" />
          by Khánh Hưng
        </div>
      </div>
    </footer>
  );
}
