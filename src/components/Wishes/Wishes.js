import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";
import "./Wishes.css";

function Wishes() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const callbackName = "handleWishesData";
    window[callbackName] = (data) => {
      setWishes(data.filter((w) => w.message && w.name).reverse());
    };
    const script = document.createElement("script");
    script.src = `https://script.google.com/macros/s/AKfycbwxlkMNbTK04grAmJLBGQD5cUVLEpO63jDIbkfiDD3MNlTJaYbVmckM7WdDwU-h2ioI/exec?callback=${callbackName}`;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <section className="wishes-section">
      <div className="wishes-header">
        <FaPenNib className="header-icon" />
        <h2>Sổ Lưu Bút</h2>
        <p>Gửi gắm yêu thương đến cô dâu & chú rể</p>
      </div>

      <div className="wishes-grid">
        {wishes.map((item, index) => (
          <motion.div
            className="wish-item"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <p className="message">{item.message}</p>
            <div className="user-info">
              <span className="name">{item.name}</span>
              <span className="dot">•</span>
              <span className="status">{item.attend}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Wishes;
