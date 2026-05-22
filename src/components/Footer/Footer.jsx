import "./Footer.css";
import { Heart, Calendar, MapPin, Quote } from "lucide-react";

export default function FooterWedding() {
  return (
    <footer className="wedding-footer">
      <div className="footer-divider">
        <Heart size={20} color="#f06292" fill="#f06292" />
      </div>

      <div className="wedding-footer-content">
        <div className="names-wrapper">
          <h2 className="names">Khánh Hưng & Trang Trang</h2>
          <div className="sub-title">Our Wedding Day</div>
        </div>

        <div className="quote-section">
          <Quote size={24} className="quote-icon" />
          <blockquote className="wedding-quote">
            “Sự gì Thiên Chúa đã kết hợp, loài người không được phân ly.”
            <cite className="quote-author">— (Mc 10, 2-16) -</cite>
          </blockquote>
        </div>

        <div className="wedding-details">
          <div className="detail-card">
            <Calendar size={18} strokeWidth={1.5} className="lucide-icon" />
            <span>10 . 01 . 2027</span>
          </div>
          <div className="detail-card">
            <MapPin size={18} strokeWidth={1.5} className="lucide-icon" />
            <span>xã Vũ Quý, tỉnh Hưng Yên</span>
          </div>
        </div>

        <div className="thanks-message">
          Trân trọng kính mời gia đình & bạn bè đến chung vui
        </div>

        <div className="map-wrapper">
          <iframe
            title="wedding-map"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1016.3186585439761!2d106.40275426959623!3d20.42083225564106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI1JzE1LjAiTiAxMDbCsDI0JzEyLjIiRQ!5e1!3m2!1svi!2s!4v1779352518614!5m2!1svi!2s"
            className="google-map"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Wedding Invitation | Handmade with{" "}
          <Heart size={12} display="inline" fill="currentColor" />
        </p>
      </div>
    </footer>
  );
}
