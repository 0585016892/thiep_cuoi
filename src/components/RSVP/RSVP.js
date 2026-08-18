import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaUser,
  FaPenFancy,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./RSVP.css";

// Import các API từ guestApi
import { layKhach, xacNhanThamDu, capNhatGhiChu } from "../../api/guestApi";

function RSVP() {
  // ======================
  // LẤY ID KHÁCH TỪ URL (?guest=ID)
  // ======================
  const guestId = new URLSearchParams(window.location.search).get("guest");

  const [khachInfo, setKhachInfo] = useState(null);
  const [dangTaiKhach, setDangTaiKhach] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    attend: "Có tham dự",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================
  // LẤY THÔNG TIN KHÁCH MỜI TỪ GUEST API
  // ======================
  useEffect(() => {
    if (!guestId) return;

    const fetchKhachData = async () => {
      try {
        setDangTaiKhach(true);
        const res = await layKhach(guestId);

        if (res?.thanhCong && res?.khach) {
          const dataKhach = res.khach;
          setKhachInfo(dataKhach);
          setFormData((prev) => ({
            ...prev,
            name: dataKhach.hoTen || dataKhach.tenKhach || "",
          }));
        } else if (res?.hoTen || res?.tenKhach) {
          setKhachInfo(res);
          setFormData((prev) => ({
            ...prev,
            name: res.hoTen || res.tenKhach || "",
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khách mời:", error);
      } finally {
        setDangTaiKhach(false);
      }
    };

    fetchKhachData();
  }, [guestId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // LOADING POPUP (SAGE THEME)
  // ======================
  const showLoadingPopup = () => {
    Swal.fire({
      html: `
        <div class="sage-popup-wrapper">
          <div class="sage-loader-pulse">🌿</div>
          <h2 class="popup-heading">Đang gửi lời chúc 💌</h2>
          <p class="popup-subtext">
            Khánh Hưng & Trang Trang đang lắng nghe lời chúc từ bạn...
          </p>
        </div>
      `,
      background: "#fdfcf9",
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "editorial-sage-popup",
      },
    });
  };

  // ======================
  // SUBMIT HANDLER
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestId) {
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="error-icon-badge">🍃</div>
            <h2 class="popup-heading">Thiếu thông tin thiệp</h2>
            <p class="popup-subtext">
              Vui lòng mở thiệp từ đường link riêng được gửi cho bạn.
            </p>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Đóng",
        customClass: {
          popup: "editorial-sage-popup",
          confirmButton: "sage-popup-btn error-btn",
        },
      });
      return;
    }

    if (!formData.name.trim()) {
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="error-icon-badge">🍃</div>
            <h2 class="popup-heading">Chưa nhập họ tên</h2>
            <p class="popup-subtext">Vui lòng nhập tên của bạn.</p>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Đã hiểu",
        customClass: {
          popup: "editorial-sage-popup",
          confirmButton: "sage-popup-btn error-btn",
        },
      });
      return;
    }

    if (!formData.message.trim()) {
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="error-icon-badge">🍃</div>
            <h2 class="popup-heading">Chưa gửi lời chúc</h2>
            <p class="popup-subtext">Hãy để lại một lời chúc dành cho dâu rể nhé ❤️</p>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Đã hiểu",
        customClass: {
          popup: "editorial-sage-popup",
          confirmButton: "sage-popup-btn error-btn",
        },
      });
      return;
    }

    setLoading(true);
    showLoadingPopup();

    try {
      const giaTriXacNhan = formData.attend === "Có tham dự" ? "Có" : "Không";

      // 1. Cập nhật trạng thái Xác Nhận Tham Dự qua Guest API
      const resultXacNhan = await xacNhanThamDu(guestId, giaTriXacNhan);
      if (resultXacNhan && resultXacNhan.thanhCong === false) {
        throw new Error(
          resultXacNhan?.thongBao || "Cập nhật xác nhận thất bại.",
        );
      }

      // 2. Lưu Lời Chúc vào Ghi Chú của khách mời
      await capNhatGhiChu(guestId, formData.message.trim());

      // 3. Gửi Email thông báo qua EMAILJS (Đặt trong try-catch riêng)
      try {
        await emailjs.send(
          "service_tuayi7m",
          "template_u5jkivi",
          {
            name: formData.name.trim(),
            attend: formData.attend,
            message: formData.message.trim(),
            guestId: guestId,
            xacNhan: giaTriXacNhan,
          },
          "zRoDm7uaLucckV6vI",
        );
      } catch (emailError) {
        // Ghi log lỗi EmailJS nhưng không throw error để khách vẫn nhận thông báo thành công
        console.warn("EmailJS Service Warning:", emailError);
      }

      Swal.close();

      // SUCCESS POPUP
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="success-icon-badge">🌿</div>
            <span class="popup-tag">WEDDING WISHES</span>
            <h2 class="popup-heading">Cảm ơn ${formData.name.trim()} rất nhiều!</h2>
            <p class="popup-subtext">
              ${
                formData.attend === "Có tham dự"
                  ? "Lời chúc ý nghĩa của bạn đã được trao tận tay<br/><strong>Khánh Hưng & Trang Trang</strong> ❤️"
                  : "Dù không thể tham dự, dâu rể vẫn trân trọng tình cảm trân quý từ bạn ❤️"
              }
            </p>
            <div class="popup-divider"></div>
            <span class="popup-note">
              Rất hân hạnh được đón tiếp bạn trong ngày cử hành hôn lễ ✨
            </span>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Đóng",
        customClass: {
          popup: "editorial-sage-popup",
          confirmButton: "sage-popup-btn",
        },
      });

      // Reset form (giữ lại thông tin tên từ API)
      setFormData((prev) => ({
        ...prev,
        attend: "Có tham dự",
        message: "",
      }));
    } catch (error) {
      console.error("RSVP ERROR:", error);
      Swal.close();

      // ERROR POPUP
      Swal.fire({
        html: `
          <div class="sage-popup-wrapper">
            <div class="error-icon-badge">🍃</div>
            <h2 class="popup-heading">Gửi chưa thành công</h2>
            <p class="popup-subtext">
              Có vẻ đường truyền mạng gặp chút trở ngại.<br/>
              Bạn vui lòng thử lại sau giây lát nhé!
            </p>
          </div>
        `,
        background: "#fdfcf9",
        confirmButtonText: "Thử lại",
        customClass: {
          popup: "editorial-sage-popup",
          confirmButton: "sage-popup-btn error-btn",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // ANIMATIONS
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="sage-rsvp-section">
      {/* Background Soft Glows */}
      <div className="rsvp-glow glow-left"></div>
      <div className="rsvp-glow glow-right"></div>

      <div className="rsvp-content-wrapper">
        {/* HEADER */}
        <motion.div
          className="editorial-rsvp-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rsvp-badge">
            <span className="dot"></span>
            <span>RSVP & WEDDING WISHES</span>
            <span className="dot"></span>
          </div>

          <h2 className="rsvp-title">Tham Dự & Gửi Lời Chúc</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="rsvp-subtitle">
            {khachInfo ? (
              <>
                Kính gửi{" "}
                <strong>{khachInfo.hoTen || khachInfo.tenKhach}</strong>! Sự
                hiện diện và những lời chúc phúc từ bạn là món quà trân quý nhất
                dành cho chúng mình 🤍
              </>
            ) : (
              "Sự hiện diện và những lời chúc phúc từ bạn là món quà trân quý nhất dành cho chúng mình 🤍"
            )}
          </p>
        </motion.div>

        {/* FORM CONTAINER */}
        <motion.form
          className="editorial-rsvp-card"
          onSubmit={handleSubmit}
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* NAME INPUT */}
          <motion.div className="form-input-group" variants={itemVars}>
            <label
              className="field-label"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                <FaUser className="field-icon" /> Họ và tên của bạn
              </span>
              {khachInfo && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#2e5b3f",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <FaCheckCircle /> Khách mời
                </span>
              )}
            </label>
            <div className="input-box-wrapper">
              <input
                type="text"
                name="name"
                placeholder={
                  dangTaiKhach ? "Đang tải thông tin..." : "Nhập tên của bạn..."
                }
                value={formData.name}
                onChange={handleChange}
                disabled={dangTaiKhach}
                required
              />
            </div>
          </motion.div>

          {/* ATTENDANCE SELECT */}
          <motion.div className="form-input-group" variants={itemVars}>
            <label className="field-label">
              <FaCalendarCheck className="field-icon" /> Bạn sẽ tham dự cùng
              chúng mình chứ?
            </label>
            <div className="input-box-wrapper">
              <select
                name="attend"
                value={formData.attend}
                onChange={handleChange}
              >
                <option value="Có tham dự">
                  Có, mình chắc chắn sẽ đến tham dự ✨
                </option>
                <option value="Không tham dự">
                  Rất tiếc mình không thể tham dự được
                </option>
              </select>
            </div>
          </motion.div>

          {/* MESSAGE TEXTAREA */}
          <motion.div className="form-input-group" variants={itemVars}>
            <label className="field-label">
              <FaPenFancy className="field-icon" /> Lời chúc của bạn
            </label>
            <div className="input-box-wrapper">
              <textarea
                name="message"
                rows="4"
                placeholder="Gửi gắm những lời chúc yêu thương nhất tới Khánh Hưng & Trang Trang..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          {/* SUBMIT BUTTON */}
          <motion.div className="form-action-group" variants={itemVars}>
            <button
              type="submit"
              className="editorial-submit-btn"
              disabled={loading || dangTaiKhach}
            >
              <FaPaperPlane className="btn-icon" />
              <span>{loading ? "ĐANG GỬI..." : "GỬI LỜI CHÚC PHÚC"}</span>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

export default RSVP;
