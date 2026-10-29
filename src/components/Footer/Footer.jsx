import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Navigation,
  Sparkles,
  Heart,
  Shirt,
} from "lucide-react";
import { layKhach } from "../../api/guestApi";
import "./Footer.css";

// Thông tin tiệc cưới nhà trai
const THONG_TIN_NHA_TRAI = {
  thoiGian: "Chủ Nhật, 27 Tháng 12, 2027",
  donKhach: "8:30 AM",
  khaiTiec: "9:00 AM",
  tenDiaDiem: "Tư Gia Nhà Trai",
  diaChi: "Xã Vũ Quý, tỉnh Hưng Yên",
  mapUrl: "https://maps.google.com/?q=20.420832,106.402754",
  mapEmbed:
    "https://maps.google.com/maps?q=20.420832,106.402754&z=15&output=embed",
};

const THONG_TIN_NHA_GAI = {
  thoiGian: "Chủ Nhật, 27 Tháng 12, 2026",
  donKhach: "8:30 AM",
  khaiTiec: "9:00 AM",
  tenDiaDiem: "Tư Gia Nhà Gái",
  diaChi: "20°23'32.3\"N 106°24'18.6\"E",

  mapUrl: "https://www.google.com/maps?q=20.392352741369223,106.402550805051",

  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3651.5475070417483!2d106.402550805051!3d20.392352741369223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDIzJzMyLjMiTiAxMDbCsDI0JzE4LjYiRQ!5e1!3m2!1svi!2s!4v1793259524575!5m2!1svi!2s",
};

export default function FooterWedding() {
  const [quanHe, setQuanHe] = useState("");
  const [dangTaiKhach, setDangTaiKhach] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("guest");

    if (!guestId) {
      setDangTaiKhach(false);
      return;
    }

    layKhach(guestId)
      .then((data) => {
        if (data?.thanhCong && data?.khach) {
          setQuanHe(data.khach.quanHe || "");
        }
      })
      .catch((error) => {
        console.error("Lỗi lấy thông tin khách mời:", error);
      })
      .finally(() => {
        setDangTaiKhach(false);
      });
  }, []);

  // Chỉ khách có quan hệ Bạn cô dâu mới hiển thị thông tin nhà gái
  const laKhachNhaGai = quanHe.trim().toLowerCase() === "bạn cô dâu";

  const thongTin = laKhachNhaGai ? THONG_TIN_NHA_GAI : THONG_TIN_NHA_TRAI;

  // Tránh hiển thị nhầm nhà trai trong lúc đang tải thông tin khách
  if (dangTaiKhach) {
    return null;
  }

  return (
    <footer className="arch-footer-section">
      <div className="arch-ambient ambient-1"></div>
      <div className="arch-ambient ambient-2"></div>

      <div className="arch-footer-container">
        <motion.div
          className="arch-header-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="arch-badge-tag">
            <span className="dot"></span>
            <span>WEDDING CELEBRATION</span>
            <span className="dot"></span>
          </div>

          <h1 className="arch-couple-title">
            Khánh Hưng <span className="ampersand">&</span> Trang Trang
          </h1>

          <p className="arch-quote">
            “Sự gì Thiên Chúa đã kết hợp, loài người không được phân ly.”
          </p>

          <div className="arch-date-pill">
            <CalendarDays size={16} />
            <span>27 . 12 . 2026</span>
          </div>
        </motion.div>

        <div className="arch-content-grid">
          <motion.div
            className="arch-details-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="arch-info-block">
              <div className="info-icon-badge">
                <CalendarDays size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Thời Gian</span>
                <h4>{thongTin.thoiGian}</h4>
                <p>
                  Đón khách: {thongTin.donKhach} — Khai tiệc:{" "}
                  {thongTin.khaiTiec}
                </p>
              </div>
            </div>

            <div className="arch-info-block">
              <div className="info-icon-badge">
                <MapPin size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Địa Điểm Tổ Chức</span>
                <h4>{thongTin.tenDiaDiem}</h4>
                <p>{thongTin.diaChi}</p>
              </div>
            </div>

            <div className="arch-info-block">
              <div className="info-icon-badge">
                <Shirt size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Trang Phục Ưu Tiên</span>
                <h4>Be, Trắng Kem, Xanh Sage</h4>
                <p>Trang trọng & Lịch sự</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="arch-map-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="arch-map-card">
              <div className="map-card-top">
                <span className="map-title">
                  <Navigation size={15} /> Vị Trí Tiệc Cưới
                </span>

                <a
                  href={thongTin.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-open-map"
                >
                  Mở Google Maps
                </a>
              </div>

              <div className="arch-map-frame">
                <iframe
                  title="wedding-location"
                  src={thongTin.mapEmbed}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="arch-footer-bottom">
          <div className="thank-message">
            <Sparkles size={16} className="sparkle" />
            <span>
              Sự hiện diện của quý vị là niềm may mắn & hạnh phúc lớn nhất của
              chúng mình 🤍
            </span>
          </div>

          <div className="copyright">
            Design with{" "}
            <Heart size={13} fill="currentColor" className="heart" /> by{" "}
            <strong>Khánh Hưng</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
