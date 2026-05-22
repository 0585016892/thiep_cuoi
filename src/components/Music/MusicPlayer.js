import { useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa";
import { HiOutlineArrowNarrowDown } from "react-icons/hi"; // Cần cài react-icons/hi
import "./MusicPlayer.css";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleStart = async () => {
    setIsUnlocked(true);
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (err) {
      console.log("Autoplay blocked");
    }
  };

  const toggleMusic = () => {
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <>
      {/* Lớp màn che Cinematic */}
      <div className={`cinematic-overlay ${isUnlocked ? "slide-up" : ""}`}>
        <div className="hero-content">
          <div className="title-wrap">
            <span className="subtitle">The Wedding of</span>
            <h1 className="main-title">
              Khánh Hưng
              <br /> & <br />
              Trang Trang
            </h1>
            <div className="divider"></div>
          </div>

          <div className="unlock-zone" onClick={handleStart}>
            <div className="circle-btn">
              <span className="hỷ-icon">囍</span>
            </div>
            <p className="pulse-text">Chạm để bắt đầu hành trình</p>
            <HiOutlineArrowNarrowDown className="bounce-arrow" />
          </div>
        </div>

        {/* Background mờ phía sau lớp màn */}
        <div className="blur-bg"></div>
      </div>

      <audio ref={audioRef} loop src="/music/perfect.mp3" />

      {/* Nút nhạc tối giản dạng đĩa quay */}
      <div
        className={`vinyl-control ${playing ? "is-spinning" : ""}`}
        onClick={toggleMusic}
      >
        <div className="vinyl-inner">{playing ? <FaMusic /> : <FaPause />}</div>
      </div>
    </>
  );
}

export default MusicPlayer;
