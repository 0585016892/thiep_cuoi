import "./Gift.css";
import { motion } from "framer-motion";
import { FaCopy, FaDownload, FaHeart, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

function Gift() {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Đã sao chép!",
      text: "Số tài khoản đã được lưu.",
      showConfirmButton: false,
      timer: 1500,
      customClass: { popup: "swal-custom" },
    });
  };

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
        icon: "success",
        title: "Tải thành công!",
        text: `QR của ${name} đã được lưu.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể tải QR, thử lại sau.",
      });
    }
  };

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
    <section className="gift-section">
      <div className="gift-bg">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1974&auto=format&fit=crop"
          alt="bg"
        />
        <div className="gift-overlay" />
      </div>

      <div className="container">
        {/* HEADER */}
        <motion.div
          className="gift-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="gift-heart">
            <FaHeart />
          </div>

          <span className="gift-mini">MỪNG CƯỚI</span>

          <h2>Khánh Hưng & Trang Trang</h2>

          <div className="line" />

          <p>
            Cảm ơn bạn đã đến chung vui và gửi những lời chúc tốt đẹp nhất đến
            chúng mình 💗
          </p>

          <h3>Nếu có lòng mừng, bạn có thể gửi tại đây ✨</h3>
        </motion.div>

        {/* GRID */}
        <div className="gift-grid">
          {data.map((item, index) => (
            <motion.div
              className="gift-card"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 + index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="user-icon">
                <FaUser />
              </div>

              <span className="role">{item.role}</span>

              <h3>{item.name}</h3>

              <p>{item.bank}</p>

              <div className="qr-box">
                <img src={item.qr} alt={item.name} />
              </div>

              <div className="bank-number">
                <span>{item.stk}</span>
                <button onClick={() => copyText(item.stk)}>
                  <FaCopy />
                </button>
              </div>

              <button
                className="download-btn"
                onClick={() => downloadQR(item.qr, item.name)}
              >
                <FaDownload /> Tải QR
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gift;
