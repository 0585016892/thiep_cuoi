import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaPaperPlane,
  FaUser,
  FaCheck,
  FaPenFancy,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"; // Import thư viện thông báo cao cấp
import "./RSVP.css";

function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attend: "Có tham dự",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwxlkMNbTK04grAmJLBGQD5cUVLEpO63jDIbkfiDD3MNlTJaYbVmckM7WdDwU-h2ioI/exec";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gửi sang Google Sheet
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      // Gửi qua EmailJS
      await emailjs.send(
        "service_7v079sf",
        "template_u5jkivi",
        {
          name: formData.name,
          attend: formData.attend,
          message: formData.message,
        },
        "n6o9BTtmuk-RKP6gv",
      );

      // --- POPUP THÀNH CÔNG LUXURY ---
      Swal.fire({
        title: "Cảm ơn bạn rất nhiều! ❤️",
        text: "Lời chúc ý nghĩa của bạn đã được gửi tới Khánh Hưng & Trang Trang.",
        icon: "success",
        background: "#fffbfa", // Khớp với màu nền thiệp
        iconColor: "#d81b60", // Màu hồng đậm chủ đạo
        confirmButtonColor: "#f48fb1", // Nút bấm màu hồng ngọt ngào
        confirmButtonText: "Đóng",
        customClass: {
          popup: "luxury-swal-popup",
          title: "luxury-swal-title",
          htmlContainer: "luxury-swal-text",
          confirmButton: "luxury-swal-button",
        },
      });

      setFormData({ name: "", attend: "Có tham dự", message: "" });
    } catch (error) {
      console.log(error);

      // --- POPUP THẤT BẠI ---
      Swal.fire({
        title: "Gửi thất bại mất rồi 😢",
        text: "Bạn vui lòng kiểm tra lại kết nối mạng và thử lại nhé!",
        icon: "error",
        background: "#fffbfa",
        iconColor: "#d81b60",
        confirmButtonColor: "#2d2d2d",
        confirmButtonText: "Thử lại",
        customClass: {
          popup: "luxury-swal-popup",
        },
      });
    }
    setLoading(false);
  };

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  return (
    <section className="luxury-rsvp-section">
      <div className="rsvp-bg-glow-top"></div>
      <div className="rsvp-bg-glow-bottom"></div>

      <div className="rsvp-container">
        <motion.div
          className="rsvp-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="rsvp-main-icon">
            <FaHeart />
          </span>
          <span className="rsvp-tag">XÁC NHẬN THAM DỰ</span>
          <h2 className="rsvp-main-title">RSVP & Wishes</h2>
          <div className="rsvp-title-divider"></div>
          <p className="rsvp-subtitle">
            Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình ❤️
          </p>
        </motion.div>

        <motion.form
          className="luxury-rsvp-form"
          onSubmit={handleSubmit}
          variants={formContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div className="luxury-input-group" variants={inputVariants}>
            <label className="input-label">
              <FaUser className="label-icon" /> Họ và tên
            </label>
            <div className="input-field-wrapper">
              <input
                type="text"
                name="name"
                className="luxury-input"
                placeholder="Nhập tên của bạn..."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <motion.div className="luxury-input-group" variants={inputVariants}>
            <label className="input-label">
              <FaCheck className="label-icon" /> Bạn sẽ tham gia chứ?
            </label>
            <div className="input-field-wrapper select-arrow">
              <select
                name="attend"
                className="luxury-select"
                value={formData.attend}
                onChange={handleChange}
              >
                <option value="Có tham dự">
                  Có, mình sẽ đến tham dự cùng hai bạn
                </option>
                <option value="Không tham dự">
                  Rất tiếc, mình không thể đến được
                </option>
              </select>
            </div>
          </motion.div>

          <motion.div className="luxury-input-group" variants={inputVariants}>
            <label className="input-label">
              <FaPenFancy className="label-icon" /> Lời chúc của bạn
            </label>
            <div className="input-field-wrapper">
              <textarea
                name="message"
                className="luxury-textarea"
                rows="4"
                placeholder="Gửi gắm những lời chúc ngọt ngào nhất tới Khánh Hưng & Trang Trang ❤️"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <motion.div className="btn-wrapper" variants={inputVariants}>
            <motion.button
              type="submit"
              className="luxury-submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane className="plane-icon" />
              {loading ? "ĐANG GỬI ĐI..." : "GỬI LỜI CHÚC"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

export default RSVP;
