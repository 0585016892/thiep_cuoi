import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MusicPlayer.css";

// Assets
import leafLeft from "../../assets/phuong-left.png";
import leafRight from "../../assets/phuong-right.png";

import { layKhach } from "../../api/guestApi";

// Danh sách nhạc phát nối tiếp
const PLAYLIST = ["/music/vaycuoi.mp3", "/music/perfect.mp3"];

function MusicPlayer() {
  const audioRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [tenKhach, setTenKhach] = useState("");
  const [dangTaiKhach, setDangTaiKhach] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("guest");

    if (!guestId) {
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

  // Xử lý khi kết thúc 1 bài -> Tự động sang bài tiếp theo
  const handleEnded = () => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
  };

  // Phát nhạc khi đổi bài
  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Lỗi tự động phát bài tiếp theo:", err);
      });
    }
  }, [currentTrackIndex, playing]);

  const handleOpen = async () => {
    // Nếu đang tải khách thì ngăn không cho mở
    if (dangTaiKhach) return;

    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      console.log("Không thể tự động phát nhạc:", err);
    }

    setTimeout(() => {
      setOpened(true);
    }, 900);
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
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Background pattern/overlay */}
            <div className="bg-overlay"></div>

            {/* Main Card Container */}
            <motion.div
              className="invitation-card"
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Decorative elements */}
              <div className="leaf-decor left">
                <img src={leafLeft} alt="" />
              </div>
              <div className="leaf-decor right">
                <img src={leafRight} alt="" />
              </div>

              {/* Inner border */}
              <div className="card-border"></div>

              {/* Content */}
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

                {/* Guest Box */}
                <div className="guest-section">
                  {dangTaiKhach ? (
                    <span className="loading-guest">
                      Đang chuẩn bị thiệp...
                    </span>
                  ) : tenKhach ? (
                    <>
                      <p className="invite-label">Trân trọng kính mời</p>
                      <h3 className="guest-name-display">{tenKhach}</h3>
                    </>
                  ) : (
                    <p className="invite-label">Trân trọng kính mời</p>
                  )}
                </div>

                <p className="invitation-text">
                  Đến dự bữa tiệc thân mật mừng ngày chung đôi của chúng mình
                </p>

                <div className="date-time">
                  <p>10 / 01 / 2027</p>
                  <span className="dot"></span>
                  <p>CHỦ NHẬT</p>
                </div>

                {/* Open Button (Khóa khi chưa load xong tên khách) */}
                <motion.button
                  className={`open-button ${dangTaiKhach ? "disabled" : ""}`}
                  disabled={dangTaiKhach}
                  whileHover={
                    !dangTaiKhach
                      ? {
                          scale: 1.05,
                          backgroundColor: "#f5f1e6",
                          color: "#2c5f50",
                        }
                      : {}
                  }
                  whileTap={!dangTaiKhach ? { scale: 0.95 } : {}}
                  onClick={handleOpen}
                  style={
                    dangTaiKhach ? { opacity: 0.6, cursor: "not-allowed" } : {}
                  }
                >
                  <span className="btn-text">
                    {dangTaiKhach ? "Đang Tải Thiệp..." : "Mở Thiệp"}
                  </span>
                  <span className="btn-icon">❤</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Single Audio Element */}
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
