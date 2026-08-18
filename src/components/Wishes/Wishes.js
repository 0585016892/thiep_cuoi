import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaQuoteLeft,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import "./Wishes.css";

// Import API từ guestApi
import { layDanhSachGhiChu } from "../../api/guestApi";

function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all' | 'attend' | 'wish'
  const [displayCount, setDisplayCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGhiChuData = async () => {
      try {
        setLoading(true);
        const res = await layDanhSachGhiChu();
        console.log("Dữ liệu ghi chú từ API:", res);

        // Tùy theo cấu trúc trả về của API layDanhSachGhiChu (mảng hoặc res.danhSach / res.data)
        const rawData = Array.isArray(res)
          ? res
          : res?.danhSach || res?.data || [];

        if (Array.isArray(rawData)) {
          // Chuẩn hóa dữ liệu tương thích với Bento Card Layout
          const formattedList = rawData
            .map((item) => {
              const name = item.hoTen || item.tenKhach || item.name || "";
              const message = item.ghiChu || item.loiChuc || item.message || "";
              const xacNhan =
                item.xacNhanThamDu || item.xacNhan || item.attend || "";

              // Kiểm tra xem trạng thái có phải là 'Có tham dự' hay không
              const isAttend =
                xacNhan === "Có" ||
                xacNhan === "Có tham dự" ||
                xacNhan === true;

              return {
                id: item.idKhach || item.id || item._id,
                name: name.trim(),
                message: message.trim(),
                attend: isAttend ? "Có tham dự" : "Gửi lời chúc",
              };
            })
            // Lọc các bản ghi chỉ giữ lại bản ghi có cả Tên và Lời chúc/Ghi chú
            .filter((w) => w.name !== "" && w.message !== "");

          setWishes(formattedList);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách ghi chú:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGhiChuData();
  }, []);

  // Lọc danh sách theo tab
  const filteredWishes = wishes.filter((item) => {
    if (filter === "attend") return item.attend === "Có tham dự";
    if (filter === "wish") return item.attend !== "Có tham dự";
    return true;
  });

  const visibleWishes = filteredWishes.slice(0, displayCount);

  return (
    <section className="sage-wishes-section">
      {/* Background Glow Effects */}
      <div className="wishes-glow glow-1"></div>
      <div className="wishes-glow glow-2"></div>

      <div className="wishes-container">
        {/* HEADER SECTION */}
        <motion.div
          className="wishes-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="wishes-badge-tag">
            <span className="dot"></span>
            <span>WEDDING WISHES</span>
            <span className="dot"></span>
          </div>

          <h2 className="wishes-title">Sổ Lưu Bút Yêu Thương</h2>

          <div className="header-leaf-divider">
            <span className="line"></span>
            <span className="leaf">🌿</span>
            <span className="line"></span>
          </div>

          <p className="wishes-subtitle">
            Cảm ơn những tình cảm ấm áp và lời chúc phúc chân thành từ tất cả
            mọi người 🤍
          </p>

          {/* FILTER TABS */}
          <div className="wishes-filter-bar">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Tất cả ({wishes.length})
            </button>
            <button
              className={`filter-btn ${filter === "attend" ? "active" : ""}`}
              onClick={() => setFilter("attend")}
            >
              <FaCheckCircle className="btn-icon" /> Sẽ tham dự (
              {wishes.filter((w) => w.attend === "Có tham dự").length})
            </button>
            <button
              className={`filter-btn ${filter === "wish" ? "active" : ""}`}
              onClick={() => setFilter("wish")}
            >
              <FaEnvelopeOpenText className="btn-icon" /> Gửi lời chúc (
              {wishes.filter((w) => w.attend !== "Có tham dự").length})
            </button>
          </div>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div
            className="loading-wishes-state"
            style={{ textAlign: "center", padding: "40px 0", color: "#6b8e78" }}
          >
            <p>🌿 Đang tải lời chúc từ sổ lưu bút...</p>
          </div>
        ) : filteredWishes.length > 0 ? (
          /* WISHES BENTO MASONRY GRID */
          <motion.div layout className="wishes-bento-grid">
            <AnimatePresence>
              {visibleWishes.map((item, index) => {
                const isAttend = item.attend === "Có tham dự";
                const isLongMessage = item.message.length > 120;
                const cardKey = item.id || `${item.name}-${index}`;

                return (
                  <motion.div
                    key={cardKey}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`wish-bento-card ${isLongMessage ? "card-wide" : ""}`}
                  >
                    <FaQuoteLeft className="quote-bg-icon" />

                    {/* TOP USER INFO */}
                    <div className="wish-card-top">
                      <div className="user-avatar-pill">
                        {item.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div className="user-meta">
                        <h4 className="user-name">{item.name}</h4>
                        <span
                          className={`attend-status-tag ${isAttend ? "status-green" : "status-sage"}`}
                        >
                          {isAttend ? (
                            <>
                              <FaCheckCircle /> Sẽ tham dự
                            </>
                          ) : (
                            <>
                              <FaHeart /> Gửi lời chúc
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* MESSAGE CONTENT */}
                    <div className="wish-card-body">
                      <p className="wish-text">{item.message}</p>
                    </div>

                    <div className="wish-card-footer">
                      <span className="card-sparkle">
                        <HiSparkles />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="empty-wishes-state">
            <p>Chưa có lời chúc nào trong mục này...</p>
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {!loading && visibleWishes.length < filteredWishes.length && (
          <motion.div
            className="wishes-loadmore-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              className="btn-loadmore-sage"
              onClick={() => setDisplayCount((prev) => prev + 6)}
            >
              Xem thêm lời chúc ({filteredWishes.length - visibleWishes.length})
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Wishes;
