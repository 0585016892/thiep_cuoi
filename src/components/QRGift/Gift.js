import "./Gift.css";
import { motion } from "framer-motion";
import { FaCopy, FaDownload, FaHeart, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

function Gift() {
  // =========================
  // COPY
  // =========================

  const copyText = (text) => {
    navigator.clipboard.writeText(text);

    Swal.fire({
      html: `
        <div class="gift-popup">
          <div class="gift-popup-icon">💖</div>

          <h2>Đã sao chép!</h2>

          <p>
            Số tài khoản đã được lưu vào clipboard
          </p>
        </div>
      `,
      showConfirmButton: false,
      timer: 1600,
      background: "#fffaf8",
      customClass: {
        popup: "gift-swal-popup",
      },
    });
  };

  // =========================
  // DOWNLOAD QR
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
          <div class="gift-popup">
            <div class="gift-popup-icon">✨</div>

            <h2>Tải thành công!</h2>

            <p>
              QR của ${name} đã được lưu
            </p>
          </div>
        `,
        showConfirmButton: false,
        timer: 1600,
        background: "#fffaf8",
        customClass: {
          popup: "gift-swal-popup",
        },
      });
    } catch {
      Swal.fire({
        html: `
          <div class="gift-popup">
            <div class="gift-popup-icon">😢</div>

            <h2>Có lỗi xảy ra</h2>

            <p>
              Không thể tải QR lúc này
            </p>
          </div>
        `,
        background: "#fffaf8",
        confirmButtonColor: "#d88ba1",
      });
    }
  };

  // =========================
  // DATA
  // =========================

  const data = [
    {
      role: "Chú Rể",
      name: "Khánh Hưng",
      bank: "MB Bank",
      stk: "200318076666",
      qr: "https://img.vietqr.io/image/MB-200318076666-compact2.png?addInfo=MungCuoiKhanhHung",
    },

    {
      role: "Cô Dâu",
      name: "Trang Trang",
      bank: "MB Bank",
      stk: "0364023640",
      qr: "https://img.vietqr.io/image/MB-0364023640-compact2.png?addInfo=MungCuoiTrangTrang",
    },
  ];

  return (
    <section className="luxury-gift-section">
      {/* FLOATING HEARTS */}

      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BLUR BACKGROUND */}

      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      <div className="gift-container">
        {/* HEADER */}

        <motion.div
          className="gift-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="gift-icon">
            <FaHeart />
          </div>

          <span className="gift-tag">WEDDING GIFT</span>

          <h2>Mừng Cưới</h2>

          <div className="gift-line"></div>

          <p>
            Cảm ơn bạn đã đến chung vui và gửi những lời chúc tốt đẹp nhất đến
            chúng mình 💗
          </p>

          <div className="gift-note">
            <FaStar />

            <span>
              Tình cảm của bạn là món quà quý giá nhất dành cho chúng mình 🤍
            </span>
          </div>
        </motion.div>

        {/* CARDS */}

        <div className="gift-grid">
          {data.map((item, index) => (
            <motion.div
              className="gift-card"
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -10,
              }}
            >
              {/* TOP */}

              <div className="card-top">
                <span className="role">{item.role}</span>

                <h3>{item.name}</h3>

                <p>{item.bank}</p>
              </div>

              {/* QR */}

              <div className="qr-wrapper">
                <img src={item.qr} alt={item.name} />
              </div>

              {/* STK */}

              <div className="bank-box">
                <div className="bank-number">
                  <span>{item.stk}</span>
                </div>

                <button className="copy-btn" onClick={() => copyText(item.stk)}>
                  <FaCopy />
                </button>
              </div>

              {/* DOWNLOAD */}

              <button
                className="download-btn"
                onClick={() => downloadQR(item.qr, item.name)}
              >
                <FaDownload />
                Tải mã QR
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gift;
