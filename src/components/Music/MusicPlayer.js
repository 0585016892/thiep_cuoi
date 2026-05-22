import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./MusicPlayer.css";
import phuong1 from "../../assets/phuong-left.png";
import phuong2 from "../../assets/phuong-right.png";
import chuhy from "../../assets/Thiết kế chưa có tên.png";
function MusicPlayer() {
  const audioRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleOpen = async () => {
    setClosing(true);

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setOpened(true);
    }, 900);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      {!opened && (
        <section
          className={`pink-invite-screen ${closing ? "cinematic-open" : ""}`}
        >
          {/* Glow background */}
          <div className="bg-blur blur-1"></div>
          <div className="bg-blur blur-2"></div>

          {/* Floating particles */}
          <div className="floating-heart heart-1">❤</div>
          <div className="floating-heart heart-2">❤</div>
          <div className="floating-heart heart-3">❤</div>

          {/* Main Card */}
          <motion.div
            className="invite-card"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* ảnh trái */}
            <div className="phoenix-left">
              <img src={phuong1} alt="" />
            </div>

            {/* ảnh phải */}
            <div className="phoenix-right">
              <img src={phuong2} alt="" />
            </div>

            {/* border line */}
            <div className="card-inner-border"></div>

            <div className="invite-content">
              <div className="cicrle-heart ">
                <img src={chuhy} alt="" />
              </div>

              <div className="mini-divider"></div>

              <h1 className="couple-name">
                Khánh Hưng
                <span>&</span>
                Trang Trang
              </h1>

              <p className="invite-date">Chủ Nhật, 10 tháng 01 năm 2027</p>

              <div className="guest-box">Trân trọng kính mời</div>

              <p className="invite-text">
                Đến chung vui trong ngày trọng đại của chúng mình
              </p>

              <motion.button
                className="open-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpen}
              >
                Mở Thiệp
              </motion.button>
            </div>
          </motion.div>
        </section>
      )}

      {/* MUSIC */}
      <audio ref={audioRef} loop src="/music/perfect.mp3" />

      {/* MUSIC CONTROL */}
      {opened && (
        <div
          className={`music-control ${playing ? "spinning" : ""}`}
          onClick={toggleMusic}
        >
          ❤
        </div>
      )}
    </>
  );
}

export default MusicPlayer;
