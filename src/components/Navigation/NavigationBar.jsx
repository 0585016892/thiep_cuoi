import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHeart,
  HiOutlinePhotograph,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlineGift,
  HiOutlineBookOpen,
  HiOutlineChatAlt2,
  HiOutlineMenu,
  HiOutlineX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import "./Navigation.css";

const navItems = [
  { id: "hero", label: "Trang Đầu", icon: <HiOutlineHeart /> },
  { id: "wedding-info", label: "Thông Tin", icon: <HiOutlineBookOpen /> },
  { id: "gallery", label: "Album Ảnh", icon: <HiOutlinePhotograph /> },
  { id: "timeline", label: "Lịch Trình", icon: <HiOutlineClock /> },
  { id: "rsvp", label: "Xác Nhận", icon: <HiOutlineMail /> },
  { id: "qr-gift", label: "Mừng Cưới", icon: <HiOutlineGift /> },
  { id: "love-story", label: "Câu Chuyện", icon: <HiOutlineHeart /> },
  { id: "wishes", label: "Sổ Lưu Bút", icon: <HiOutlineChatAlt2 /> },
];

export default function NavigationBar({ activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false); // Mobile state
  const [isDesktopOpen, setIsDesktopOpen] = useState(false); // PC state (Mặc định đóng hoặc mở)

  return (
    <>
      {/* DESKTOP FLOATING NAVBAR - FIXED GÓC PHẢI */}
      <nav className="desktop-floating-nav">
        <motion.div className="nav-glass-bar">
          {/* LOGO */}
          <div className="nav-logo" onClick={() => onNavigate("hero")}>
            <span>H</span>
            <span className="heart">❤</span>
            <span>T</span>
          </div>

          {/* MENU LINKS (XỜE SANG BÊN TRÁI) */}
          <AnimatePresence initial={false}>
            {isDesktopOpen && (
              <motion.div
                className="nav-links"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-link-btn ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activePill"
                        className="active-pill-bg"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* NÚT TOGGLE ĐÓNG / MỞ */}
          <button
            className="desktop-toggle-btn"
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            title={isDesktopOpen ? "Thu gọn menu" : "Mở rộng menu"}
          >
            {isDesktopOpen ? (
              <HiChevronRight size={18} />
            ) : (
              <HiChevronLeft size={18} />
            )}
          </button>
        </motion.div>
      </nav>

      {/* MOBILE TRIGGER & DRAWER */}
      <div className="mobile-nav-trigger">
        <button
          className="mobile-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-menu-inner">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`mobile-menu-item ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-text">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
