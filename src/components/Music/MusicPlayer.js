import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MusicPlayer.css";

// Assets
import leafLeft from "../../assets/Phuong.webp";
import leafRight from "../../assets/Phuong2.webp";
import anhphongbilopduoi from "../../assets/envelope.webp";
import anhphongbiloptren from "../../assets/envelope-cut.webp";
import flower2 from "../../assets/flower2.webp";

import { layKhach } from "../../api/guestApi";

const PLAYLIST = ["/music/vaycuoi.mp3", "/music/perfect.mp3"];

function MusicPlayer() {
  const audioRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [cardExited, setCardExited] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [tenKhach, setTenKhach] = useState("");
  const [dangTaiKhach, setDangTaiKhach] = useState(true); // Mặc định là true để kiểm tra ID trước

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("guest");

    if (!guestId) {
      setDangTaiKhach(false);
      return;
    }

    setDangTaiKhach(true);

    layKhach(guestId)
      .then((data) => {
        if (data && data.thanhCong && data.khach) {
          setTenKhach(data.khach.hoTen || "");
        }
      })
      .catch((error) => {
        console.error("Lỗi lấy khách mời:", error);
      })
      .finally(() => {
        setDangTaiKhach(false);
      });
  }, []);

  const handleEnded = () => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
  };

  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Lỗi tự động phát bài tiếp theo:", err);
      });
    }
  }, [currentTrackIndex, playing]);

  const handleOpen = async () => {
    // KHÔNG CHO PHÁT NẾU ĐANG TẢI TÊN KHÁCH HOẶC ĐANG MỞ
    if (dangTaiKhach || isOpening) return;

    setIsOpening(true);

    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      console.log("Không thể tự động phát nhạc:", err);
    }

    // Phase 2: Thiệp xoay thẳng và rút nhô lên trên
    setTimeout(() => {
      setCardExited(true);
    }, 400);

    // Phase 3: Mở sang nội dung chính
    setTimeout(() => {
      setOpened(true);
    }, 2200);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.section
            className="invite-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="bg-overlay"></div>

            {/* Container Khung Phong Bì */}
            <div
              className={`envelope-container ${isOpening ? "is-opening" : ""} ${
                cardExited ? "card-exited" : ""
              }`}
            >
              {/* LỚP 1: Lòng phong bì / Mặt sau */}
              <img
                src={anhphongbilopduoi}
                alt="Phong bì lớp dưới"
                className="envelope-img back-layer"
              />
              <img
                src={flower2}
                alt="Ảnh hoa"
                className="envelope-img back-flower"
              />

              {/* LỚP 2: Card Thiệp cưới nghiêng */}
              <div className="invitation-card-wrapper">
                <div className="invitation-card">
                  <div className="leaf-decor left">
                    <img src={leafLeft} alt="" />
                  </div>
                  <div className="leaf-decor right">
                    <img src={leafRight} alt="" />
                  </div>

                  <div className="card-border"></div>

                  <div className="card-content">
                    <p className="save-the-date">SAVE THE DATE</p>

                    <h1 className="couple-name">
                      <div className="name-block">
                        <span className="first-name">Khánh Hưng</span>
                      </div>
                      <span className="ampersand">&</span>
                      <div className="name-block">
                        <span className="first-name">Trang Trang</span>
                      </div>
                    </h1>

                    <p className="invitation-text">
                      Đến dự bữa tiệc thân mật mừng ngày chung đôi của chúng
                      mình
                    </p>

                    <div className="date-time">
                      <p>27 / 12 / 2026</p>
                      <span className="dot"></span>
                      <p>CHỦ NHẬT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LỚP 3: Nắp & Mặt trước phong bì */}
              <div
                className={`lop3-phongbi ${dangTaiKhach ? "disabled" : ""}`}
                onClick={handleOpen}
              >
                <img
                  src={anhphongbiloptren}
                  alt="Phong bì lớp trên"
                  className="envelope-img front-layer"
                />

                <div className="guest-section">
                  <AnimatePresence mode="wait">
                    {dangTaiKhach ? (
                      /* KHU VỰC LOADING SANG TRỌNG */
                      <motion.div
                        className="guest-loading-box"
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="guest-spinner"></span>
                        <p className="loading-text">
                          Đang viết tên quan khách...
                        </p>
                      </motion.div>
                    ) : (
                      /* KHU VỰC HIỂN THỊ TÊN KHI LOAD XONG */
                      <motion.div
                        className="guest-info-box"
                        key="content"
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <p className="invite-label">Trân trọng kính mời</p>
                        {tenKhach ? (
                          <h3 className="guest-name-display">{tenKhach}</h3>
                        ) : (
                          <h3 className="guest-name-display default-guest">
                            Quý Khách
                          </h3>
                        )}
                        <span className="tap-hint">
                          {isOpening ? "Đang mở..." : "Chạm để mở thiệp"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrackIndex]}
        onEnded={handleEnded}
      />

      {opened && (
        <div
          className={`music-toggle-btn ${playing ? "playing" : ""}`}
          onClick={toggleMusic}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
    </>
  );
}

export default MusicPlayer;
