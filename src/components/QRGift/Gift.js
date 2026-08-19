import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaDownload, FaTimes, FaQrcode } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Gift.css";

// Import 2 hình phong bì
import phongbi1 from "../../assets/song_hy_green.webp";
import phongbi2 from "../../assets/song_hy_green (1).webp";

function Gift() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Dữ liệu tài khoản của cả 2 vợ chồng
  const giftData = [
    {
      id: "chure",
      role: "CHÚ RỂ",
      name: "Khánh Hưng",
      bank: "MB BANK",
      stk: "200318076666",
      qr: "https://img.vietqr.io/image/MB-200318076666-compact2.png?addInfo=MungCuoiKhanhHung",
      coverImg: phongbi1,
    },
    {
      id: "codau",
      role: "CÔ DÂU",
      name: "Trang Trang",
      bank: "MB BANK",
      stk: "0364023640",
      qr: "https://img.vietqr.io/image/MB-0364023640-compact2.png?addInfo=MungCuoiTrangTrang",
      coverImg: phongbi2,
    },
  ];

  // Hàm sao chép STK
  const copyText = (text, name) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      html: `
        <div class="sage-popup-wrapper">
          <div class="success-icon-badge">✨</div>
          <h2 class="popup-heading">Đã Sao Chép!</h2>
          <p class="popup-subtext">Số tài khoản của <strong>${name}</strong> đã được lưu.</p>
        </div>
      `,
      showConfirmButton: false,
      timer: 1500,
      background: "#fdfcf9",
      customClass: { popup: "editorial-sage-popup" },
    });
  };

  // Hàm tải ảnh QR
  const downloadQR = async (url, name) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = `QR_MungCuoi_${name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="success-icon-badge">🌿</div>
            <h2 class="popup-heading">Tải QR Thành Công!</h2>
            <p class="popup-subtext">Mã QR mừng cưới của <strong>${name}</strong> đã tải về máy.</p>
          </div>
        `,
        showConfirmButton: false,
        timer: 1500,
        background: "#fdfcf9",
        customClass: { popup: "editorial-sage-popup" },
      });
    } catch {
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <h2 class="popup-heading">Có lỗi xảy ra</h2>
            <p class="popup-subtext">Vui lòng thử lại sau!</p>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Đóng",
      });
    }
  };

  return (
    <section className="sage-gift-section">
      <div className="gift-glow glow-left"></div>
      <div className="gift-glow glow-right"></div>

      <div className="gift-content-wrapper">
        {/* HEADER */}
        <motion.div
          className="album-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="rsvp-badge">
            <span className="dot"></span>
            <span>WEDDING GIFT</span>
            <span className="dot"></span>
          </div>

          <h2 className="rsvp-title">HỘP QUÀ MỪNG CƯỚI</h2>
        </motion.div>

        {/* KHU VỰC PHONG BÌ (HOVER VÀO ĐÂY LÀ CẢ 2 CÙNG LẮC) */}
        <motion.div
          className="envelopes-overlapping-wrapper"
          onClick={() => setIsOpenModal(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          title="Nhấn để mở mừng cưới"
        >
          {/* DANH SÁCH CÁC NGÔI SAO LẤP LÁNH (SPARKLES) */}
          <span
            className="ienv-sparkle sparkle-1"
            style={{ top: "8%", left: "12%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-2"
            style={{ top: "18%", right: "15%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-3"
            style={{ top: "42%", left: "5%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-4"
            style={{ top: "25%", right: "5%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-5"
            style={{ top: "65%", left: "18%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-6"
            style={{ top: "58%", right: "12%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-7"
            style={{ top: "82%", left: "28%" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle sparkle-8"
            style={{ top: "88%", right: "22%" }}
          >
            ✦
          </span>

          {/* Phong bì Chú Rể (Trước) */}
          <div className="envelope-item envelope-front">
            <img src={giftData[0].coverImg} alt="Phong bì Chú Rể" />
          </div>

          {/* Phong bì Cô Dâu (Sau) */}
          <div className="envelope-item envelope-back">
            <img src={giftData[1].coverImg} alt="Phong bì Cô Dâu" />
          </div>
        </motion.div>

        <p className="tap-to-open-hint">Nhấn để mở</p>
      </div>

      {/* MODAL MỞ RA CHỨA CẢ 2 TÀI KHOẢN QR */}
      <AnimatePresence>
        {isOpenModal && (
          <div
            className="gift-modal-backdrop"
            onClick={() => setIsOpenModal(false)}
          >
            <motion.div
              className="gift-modal-card dual-qr-modal"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nút Đóng Modal */}
              <button
                className="close-modal-btn"
                onClick={() => setIsOpenModal(false)}
              >
                <FaTimes />
              </button>

              <h3 className="modal-main-title">Mừng Cưới Đến Dâu Rể</h3>

              {/* GRID HIỂN THỊ SONG SONG 2 TÀI KHOẢN */}
              <div className="dual-qr-grid">
                {giftData.map((item) => (
                  <div key={item.id} className="qr-card-item">
                    {/* Header từng bên */}
                    <div className="modal-header">
                      <span className="modal-role">{item.role}</span>
                      <h4 className="modal-name">{item.name}</h4>
                      <p className="modal-bank">{item.bank}</p>
                    </div>

                    {/* Khung Mã QR */}
                    <div className="modal-qr-frame">
                      <img src={item.qr} alt={`QR ${item.name}`} />
                      <div className="qr-watermark">
                        <FaQrcode /> VietQR
                      </div>
                    </div>

                    {/* STK & Sao Chép */}
                    <div className="modal-bank-info">
                      <div className="stk-display">
                        <span className="stk-value">{item.stk}</span>
                      </div>
                      <button
                        className="copy-chip-btn"
                        onClick={() => copyText(item.stk, item.name)}
                      >
                        <FaCopy /> <span>Coppy</span>
                      </button>
                    </div>

                    {/* Nút Tải QR */}
                    <button
                      className="download-qr-btn"
                      onClick={() => downloadQR(item.qr, item.name)}
                    >
                      <FaDownload className="btn-icon" /> Tải QR
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gift;
