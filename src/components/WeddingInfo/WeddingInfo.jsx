import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./WeddingInfo.css";
import ringImage from "../../assets/Bill.png";
import { layKhach } from "../../api/guestApi"; // Sửa theo đường dẫn API thực tế

const WeddingInfo = () => {
  const [laKhachNhaGai, setLaKhachNhaGai] = useState(false);
  const [dangTaiKhach, setDangTaiKhach] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("guest");

    if (!guestId) {
      setDangTaiKhach(false);
      return;
    }

    let cancelled = false;

    layKhach(guestId)
      .then((data) => {
        if (cancelled) return;

        if (data?.thanhCong && data?.khach) {
          const quanHe = String(data.khach.quanHe || "")
            .trim()
            .toLowerCase();

          setLaKhachNhaGai(quanHe === "bạn cô dâu");
        }
      })
      .catch((error) => {
        console.error("Không thể lấy thông tin khách mời:", error);
      })
      .finally(() => {
        if (!cancelled) setDangTaiKhach(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (dangTaiKhach) return null;

  // Đảo thứ tự hai bên gia đình theo nhóm khách mời.
  const giaDinh = laKhachNhaGai
    ? [
        {
          className: "bride-family",
          title: "HỌ NHÀ GÁI",
          ong: "Nguyễn Ngọc Ánh",
          ba: "Đoàn Thị Thìn",
          diaChi1: "Thôn Ngái Đông, xã Quang Bình, tỉnh Hưng Yên",
          diaChi2: "Thôn Đông, xã Quang Bình, tỉnh Thái Bình",
        },
        {
          className: "groom-family",
          title: "HỌ NHÀ TRAI",
          ong: "Trần Khánh Duy",
          ba: "Nguyễn Thị Thịnh",
          diaChi1: "Thôn 4, xã Vũ Quý, tỉnh Hưng Yên",
          diaChi2: "Thôn Phụng Thượng, xã Vũ An, tỉnh Thái Bình",
        },
      ]
    : [
        {
          className: "groom-family",
          title: "HỌ NHÀ TRAI",
          ong: "Trần Khánh Duy",
          ba: "Nguyễn Thị Thịnh",
          diaChi1: "Thôn 4, xã Vũ Quý, tỉnh Hưng Yên",
          diaChi2: "Thôn Phụng Thượng, xã Vũ An, tỉnh Thái Bình",
        },
        {
          className: "bride-family",
          title: "HỌ NHÀ GÁI",
          ong: "Nguyễn Ngọc Ánh",
          ba: "Đoàn Thị Thìn",
          diaChi1: "Thôn Ngái Đông, xã Quang Bình, tỉnh Hưng Yên",
          diaChi2: "Thôn Đông, xã Quang Bình, tỉnh Thái Bình",
        },
      ];

  const thongTinCoDauChuRe = laKhachNhaGai
    ? [
        { role: "ÚT NỮ", name: "Trang Trang" },
        { role: "TRƯỞNG NAM", name: "Khánh Hưng" },
      ]
    : [
        { role: "TRƯỞNG NAM", name: "Khánh Hưng" },
        { role: "ÚT NỮ", name: "Trang Trang" },
      ];

  return (
    <section className="wedding-arch-section">
      <div className="bg-leaf-pattern"></div>

      <motion.div
        className="arch-card-container"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="arch-inner-border"></div>

        <div className="arch-header">
          <span className="sub-title-tag">SAVE OUR DATE</span>
          <h2 className="main-title">Trân Trọng Báo Tin</h2>
          <div className="header-divider">
            <span className="line"></span>
            <span className="leaf-symbol">🌿</span>
            <span className="line"></span>
          </div>
        </div>

        <div className="families-container">
          {giaDinh.map((family) => (
            <div
              className={`family-box ${family.className}`}
              key={family.title}
            >
              <span className="family-title">{family.title}</span>

              <p className="parents-name">
                Ông: <strong>{family.ong}</strong>
              </p>

              <p className="parents-name">
                Bà: <strong>{family.ba}</strong>
              </p>

              <p className="family-location">
                <FaMapMarkerAlt className="mini-icon" /> {family.diaChi1}
              </p>

              <p className="family-location" style={{ fontSize: "11px" }}>
                <FaMapMarkerAlt className="mini-icon" /> {family.diaChi2}
              </p>
            </div>
          ))}

          <div className="family-center-icon">
            <img
              src={ringImage}
              alt="Nhẫn cưới"
              className="wedding-ring-icon"
            />
          </div>
        </div>

        <div className="hero-couple-names">
          {thongTinCoDauChuRe.map((person, index) => (
            <React.Fragment key={person.role}>
              {index === 1 && <span className="couple-ampersand">&</span>}

              <div className="person-block">
                <span className="person-role">{person.role}</span>
                <h3 className="person-name">{person.name}</h3>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="event-details-card">
          <p className="venue-header">
            {laKhachNhaGai
              ? "LỄ XIN DÂU CỬ HÀNH TẠI TƯ GIA NHÀ GÁI"
              : "LỄ THÀNH HÔN CỬ HÀNH TẠI TƯ GIA NHÀ TRAI"}
          </p>

          <div className="event-time-badge">
            <FaClock className="time-icon" />
            <span>12:05 SÁNG</span>
          </div>

          <div className="minimal-date-display">
            <div className="date-col text-col">CHỦ NHẬT</div>
            <div className="date-col number-col">27</div>
            <div className="date-col text-col">
              <span>THÁNG 12</span>
              <span className="year-sub">2026</span>
            </div>
          </div>

          <div className="lunar-pill">
            <FaCalendarAlt className="lunar-icon" />
            <span>Tức ngày 19/11/2026 (Âm lịch Bính Ngọ)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WeddingInfo;
