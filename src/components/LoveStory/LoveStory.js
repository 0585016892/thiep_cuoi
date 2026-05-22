    import React, { useEffect, useState } from "react";
    import { motion } from "framer-motion";
    import { FaHeart, FaRing, FaCompass, FaStar } from "react-icons/fa";
    import "./LoveStory.css";

    function LoveStory() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const stories = [
        {
        icon: <FaCompass />,
        title: "Lần Đầu Gặp Gỡ",
        date: "2022",
        desc: "Khánh Hưng và Trang Trang gặp nhau trong một dịp rất tình cờ. Từ những cuộc trò chuyện nhỏ, cả hai dần trở nên thân thiết và nhận ra tần số chung của nhau.",
        },
        {
        icon: <FaHeart />,
        title: "Bắt Đầu Yêu",
        date: "2023",
        desc: "Sau khoảng thời gian đồng hành, cả hai nhận ra đối phương chính là mảnh ghép hoàn hảo mà mình muốn cùng đi qua những tháng năm thanh xuân sau này.",
        },
        {
        icon: <FaStar />,
        title: "Lời Cầu Hôn Ngọt Ngào",
        date: "2025",
        desc: "Dưới ánh hoàng hôn lãng mạn, một lời cầu hôn chân thành đã được thốt lên, đánh dấu một bước ngoặt mới đầy hạnh phúc của Khánh Hưng và Trang Trang.",
        },
        {
        icon: <FaRing />,
        title: "Ngày Chung Đôi",
        date: "2027",
        desc: "Và hôm nay, kết thúc một hành trình yêu để mở ra một chương mới cuộc đời, chúng mình chính thức nắm tay nhau về chung một nhà ❤️",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = (index) => {
        if (isMobile) {
        return {
            hidden: { opacity: 0, x: 30, y: 10 },
            visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
        };
        }
        // PC: Thẻ chẵn bay từ trái sang, thẻ lẻ bay từ phải sang
        return {
        hidden: { opacity: 0, x: index % 2 === 0 ? -80 : 80, y: 0 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
            type: "spring",
            stiffness: 60,
            damping: 14,
            duration: 0.6,
            },
        },
        };
    };

    return (
        <section className="luxury-story-section">
        <div className="story-container">
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="story-header"
            >
            <span className="story-tag">OUR JOURNEY</span>
            <h2 className="story-main-title">Câu Chuyện Tình Yêu</h2>
            <div className="story-title-divider"></div>
            </motion.div>

            <motion.div
            className="timeline-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            >
            {/* Trục dọc chính */}
            <motion.div
                className="timeline-center-line"
                variants={{
                hidden: { scaleY: 0 },
                visible: {
                    scaleY: 1,
                    transition: { duration: 1, ease: "easeInOut" },
                },
                }}
            />

            {stories.map((item, index) => (
                /* Đổi class động theo chẵn lẻ: item-even (bên trái) và item-odd (bên phải) */
                <div
                className={`timeline-item ${index % 2 === 0 ? "item-even" : "item-odd"}`}
                key={index}
                >
                {/* Nút chứa Icon ở giữa */}
                <motion.div
                    className="timeline-badge"
                    variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: {
                        scale: 1,
                        opacity: 1,
                        transition: { delay: index * 0.1, duration: 0.4 },
                    },
                    }}
                >
                    {item.icon}
                </motion.div>

                {/* Thẻ nội dung câu chuyện */}
                <motion.div
                    className="story-content-card"
                    variants={cardVariants(index)}
                >
                    <span className="story-year">{item.date}</span>
                    <h3 className="story-node-title">{item.title}</h3>
                    <p className="story-node-desc">{item.desc}</p>
                </motion.div>
                </div>
            ))}
            </motion.div>
        </div>
        </section>
    );
    }

    export default LoveStory;
