import React from "react";
import { motion } from "framer-motion";
import { FaCopy, FaDownload, FaQrcode } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Gift.css";

function Gift() {
  // =========================
  // COPY STK HANDLER
  // =========================
  const copyText = (text, name) => {
    navigator.clipboard.writeText(text);

    Swal.fire({
      html: `
        <div class="sage-popup-wrapper">
          <div class="success-icon-badge">✨</div>
          <h2 class="popup-heading">Đã Sao Chép!</h2>
          <p class="popup-subtext">
            Số tài khoản của <strong>${name}</strong> đã được lưu vào bộ nhớ tạm.
          </p>
        </div>
      `,
      showConfirmButton: false,
      timer: 1600,
      background: "#fdfcf9",
      customClass: {
        popup: "editorial-sage-popup",
      },
    });
  };

  // =========================
  // DOWNLOAD QR HANDLER
  // =========================
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
            <p class="popup-subtext">
              Mã QR mừng cưới của <strong>${name}</strong> đã được tải về máy.
            </p>
          </div>
        `,
        showConfirmButton: false,
        timer: 1600,
        background: "#fdfcf9",
        customClass: {
          popup: "editorial-sage-popup",
        },
      });
    } catch {
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="error-icon-badge">🍃</div>
            <h2 class="popup-heading">Có lỗi xảy ra</h2>
            <p class="popup-subtext">Chưa thể tải mã QR lúc này. Bạn vui lòng thử lại nhé!</p>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Đóng",
        customClass: {
          popup: "editorial-sage-popup",
          confirmButton: "sage-popup-btn error-btn",
        },
      });
    }
  };

  // DATA
  const data = [
    {
      role: "CHÚ RỂ",
      name: "Khánh Hưng",
      bank: "MB BANK",
      stk: "200318076666",
      qr: "https://img.vietqr.io/image/MB-200318076666-compact2.png?addInfo=MungCuoiKhanhHung",
    },
    {
      role: "CÔ DÂU",
      name: "Trang Trang",
      bank: "MB BANK",
      stk: "0364023640",
      qr: "https://img.vietqr.io/image/MB-0364023640-compact2.png?addInfo=MungCuoiTrangTrang",
    },
  ];

  return (
    <section className="sage-gift-section">
      {/* Background Soft Glows */}
      <div className="gift-glow glow-left"></div>
      <div className="gift-glow glow-right"></div>

      <div className="gift-content-wrapper">
        {/* HEADER SECTION */}
        <motion.div
          className="editorial-gift-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gift-badge">
            <span className="dot"></span>
            <span>WEDDING GIFT</span>
            <span className="dot"></span>
          </div>

          <h2 className="gift-title">Hộp Mừng Cưới</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="gift-subtitle">
            Sự hiện diện và tình cảm quý báu của bạn là món quà ý nghĩa nhất
            dành cho Khánh Hưng & Trang Trang 🤍
          </p>
        </motion.div>

        {/* CARDS GRID */}
        <div className="gift-cards-grid">
          {data.map((item, index) => (
            <motion.div
              className="editorial-gift-card"
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
            >
              {/* TOP HEADER */}
              <div className="card-top-header">
                <span className="role-tag">{item.role}</span>
                <h3 className="person-name">{item.name}</h3>
                <span className="bank-name">{item.bank}</span>
              </div>

              {/* QR IMAGE FRAME */}
              <div className="qr-image-frame">
                <img src={item.qr} alt={`Mã QR ${item.name}`} loading="lazy" />
                <div className="qr-watermark">
                  <FaQrcode /> VietQR
                </div>
              </div>

              {/* STK BOX */}
              <div className="bank-info-box">
                <div className="stk-display">
                  <span className="stk-label">STK:</span>
                  <span className="stk-value">{item.stk}</span>
                </div>
                <button
                  className="copy-chip-btn"
                  onClick={() => copyText(item.stk, item.name)}
                  title="Sao chép số tài khoản"
                >
                  <FaCopy /> <span>Sao chép</span>
                </button>
              </div>

              {/* DOWNLOAD BUTTON */}
              <button
                className="download-qr-btn"
                onClick={() => downloadQR(item.qr, item.name)}
              >
                <FaDownload className="btn-icon" /> Tải Mã QR
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gift;
