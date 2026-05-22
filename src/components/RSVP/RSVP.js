import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaPaperPlane,
  FaUser,
  FaPenFancy,
  FaCalendarCheck,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
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

  // ======================
  // LOADING POPUP
  // ======================

  const showLoadingPopup = () => {
    Swal.fire({
      html: `
        <div class="loading-popup">
          <div class="loading-heart-wrapper">
            <div class="heart-loader"></div>
            <div class="heart-loader"></div>
            <div class="heart-loader"></div>
          </div>

          <h2>Đang gửi lời chúc 💌</h2>

          <p>
            Khánh Hưng & Trang Trang đang nhận lời chúc của bạn...
          </p>
        </div>
      `,
      background: "#fffaf8",
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "luxury-popup",
      },
    });
  };

  // ======================
  // SUBMIT
  // ======================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    showLoadingPopup();

    try {
      // GOOGLE SHEET
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      // EMAILJS
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

      Swal.close();

      // SUCCESS
      Swal.fire({
        html: `
          <div class="success-popup">
            <div class="success-icon">❤️</div>

            <span class="popup-tag">
              Wedding Wishes
            </span>

            <h2>Cảm ơn bạn rất nhiều!</h2>

            <p>
              Lời chúc của bạn đã được gửi tới
              <strong> Khánh Hưng & Trang Trang </strong>
            </p>

            <div class="popup-divider"></div>

            <span class="popup-note">
              Hẹn gặp bạn trong ngày trọng đại ✨
            </span>
          </div>
        `,
        background: "#fffaf8",
        confirmButtonText: "Đóng",
        confirmButtonColor: "#d88ba1",
        customClass: {
          popup: "luxury-popup",
          confirmButton: "luxury-btn",
        },
      });

      setFormData({
        name: "",
        attend: "Có tham dự",
        message: "",
      });
    } catch (error) {
      console.log(error);

      Swal.close();

      // ERROR
      Swal.fire({
        html: `
          <div class="error-popup">
            <div class="error-icon">😢</div>

            <h2>Gửi thất bại</h2>

            <p>
              Có vẻ kết nối đang gặp chút vấn đề.<br/>
              Bạn thử lại sau ít phút nhé!
            </p>
          </div>
        `,
        background: "#fffaf8",
        confirmButtonText: "Thử lại",
        confirmButtonColor: "#2d2d2d",
        customClass: {
          popup: "luxury-popup",
          confirmButton: "luxury-btn dark",
        },
      });
    }

    setLoading(false);
  };

  // ======================
  // ANIMATION
  // ======================

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };

  return (
    <section className="rsvp-section">
      {/* FLOATING HEARTS */}
      <div className="floating-hearts">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      {/* BACKGROUND */}

      <div className="bg-blur blur1"></div>
      <div className="bg-blur blur2"></div>

      <div className="rsvp-container">
        {/* HEADER */}

        <motion.div
          className="rsvp-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="header-heart">
            <FaHeart />
          </div>

          <span className="header-tag">RSVP & WEDDING WISHES</span>

          <h2>Tham Dự & Gửi Lời Chúc</h2>

          <div className="header-line"></div>

          <p>
            Sự hiện diện của bạn là niềm hạnh phúc lớn nhất trong ngày trọng đại
            của chúng mình 🤍
          </p>
        </motion.div>

        {/* FORM */}

        <motion.form
          className="luxury-form"
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* NAME */}

          <motion.div className="form-group" variants={item}>
            <label>
              <FaUser />
              Họ và tên
            </label>

            <input
              type="text"
              name="name"
              placeholder="Nhập tên của bạn..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* ATTEND */}

          <motion.div className="form-group" variants={item}>
            <label>
              <FaCalendarCheck />
              Bạn sẽ tham dự chứ?
            </label>

            <select
              name="attend"
              value={formData.attend}
              onChange={handleChange}
            >
              <option value="Có tham dự">Có, mình sẽ đến tham dự ❤️</option>

              <option value="Không tham dự">
                Rất tiếc mình không thể tham dự
              </option>
            </select>
          </motion.div>

          {/* MESSAGE */}

          <motion.div className="form-group" variants={item}>
            <label>
              <FaPenFancy />
              Lời chúc của bạn
            </label>

            <textarea
              name="message"
              rows="5"
              placeholder="Gửi những lời chúc tốt đẹp nhất tới Khánh Hưng & Trang Trang..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* BUTTON */}

          <motion.div className="submit-wrapper" variants={item}>
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={loading}
            >
              <FaPaperPlane />

              {loading ? "ĐANG GỬI..." : "GỬI LỜI CHÚC"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

export default RSVP;
