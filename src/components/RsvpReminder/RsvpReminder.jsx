import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarCheck, FaEnvelopeOpenText, FaTimes } from "react-icons/fa";
import "./RsvpReminder.css";

function RsvpReminder({ onOpenRsvpModal }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Tự động hiện banner sau khi người dùng lướt web 2 giây
    const timer = setTimeout(() => {
      // Kiểm tra nếu người dùng chưa đóng banner trong phiên truy cập này
      const isDismissed = sessionStorage.getItem("rsvp_reminder_dismissed");
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("rsvp_reminder_dismissed", "true");
  };

  const handleRsvpClick = () => {
    if (onOpenRsvpModal) {
      onOpenRsvpModal();
    } else {
      // Tìm element theo class sage-rsvp-section
      const element = document.querySelector(".sage-rsvp-section");

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Dự phòng trường hợp tìm theo id nếu có id="rsvp"
        const elementById =
          document.getElementById("rsvp-section") ||
          document.getElementById("rsvp");
        if (elementById) {
          elementById.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="rsvp-floating-banner"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <button
            className="rsvp-close-btn"
            onClick={handleClose}
            aria-label="Đóng"
          >
            <FaTimes />
          </button>

          <div className="rsvp-banner-content">
            <div className="rsvp-icon-wrapper">
              <FaCalendarCheck className="rsvp-icon" />
            </div>

            <div className="rsvp-text-group">
              <span className="rsvp-tag">NHẮC NHỎ THÂN MẬT</span>
              <p className="rsvp-message">
                Bạn sẽ đến chung vui cùng tụi mình chứ? Hãy xác nhận tham dự
                nhé! ✨
              </p>
            </div>
          </div>

          <div className="rsvp-banner-actions">
            <button className="btn-rsvp-primary" onClick={handleRsvpClick}>
              <FaEnvelopeOpenText /> Xác nhận ngay
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RsvpReminder;
