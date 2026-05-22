import React, { useEffect, useState } from "react";

import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Avatar,
  Badge,
  Stack,
} from "@mantine/core";

import { motion } from "framer-motion";

import { IconHeart } from "@tabler/icons-react";

import "./Wishes.css";

function Wishes() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const callbackName = "handleWishesData";

    window[callbackName] = (data) => {
      setWishes(data.filter((w) => w.message && w.name));
    };

    const script = document.createElement("script");

    script.src = `https://script.google.com/macros/s/AKfycbwxlkMNbTK04grAmJLBGQD5cUVLEpO63jDIbkfiDD3MNlTJaYbVmckM7WdDwU-h2ioI/exec?callback=${callbackName}`;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="wishes-section">
      {/* blur background */}
      <div className="blur blur-1"></div>
      <div className="blur blur-2"></div>

      <Container size="xl">
        {/* Header */}
        <Stack align="center" mb={70}>
          <span className="wish-tag">Wedding Wishes</span>

          <Title order={1} className="wishes-title">
            Sổ Lưu Bút
          </Title>

          <Text c="dimmed" ta="center" maw={650} className="wish-subtitle">
            Những lời chúc chân thành sẽ trở thành kỷ niệm đẹp nhất của chúng
            mình 🤍
          </Text>
        </Stack>

        {/* marquee row 1 */}
        <div className="marquee">
          <div className="marquee-track">
            {[...wishes, ...wishes].map((item, index) => (
              <WishCard item={item} index={index} />
            ))}
          </div>
        </div>

        {/* marquee row 2 */}
        <div className="marquee reverse">
          <div className="marquee-track">
            {[...wishes, ...wishes].map((item, index) => (
              <WishCard item={item} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function WishCard({ item, index }) {
  return (
    <motion.div
      key={index}
      whileHover={{
        y: -8,
        rotate: 0,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className={`wish-wrapper rotate-${(index % 4) + 1}`}
    >
      <Card className="wish-card" radius="32px" shadow="sm">
        {/* top */}
        <Group mb="lg">
          <Avatar radius="xl" color="pink" variant="light" size={52}>
            {item.name?.charAt(0)?.toUpperCase()}
          </Avatar>

          <div>
            <Text fw={700} size="sm">
              {item.name}
            </Text>

            <Badge
              mt={5}
              radius="xl"
              size="sm"
              variant="light"
              color={item.attend === "Có tham dự" ? "green" : "pink"}
            >
              {item.attend === "Có tham dự" ? "Sẽ tham dự" : "Gửi lời chúc"}
            </Badge>
          </div>
        </Group>

        {/* message */}
        <Text className="wish-message">
          <IconHeart size={16} className="heart-icon" />

          {item.message}
        </Text>
      </Card>
    </motion.div>
  );
}

export default Wishes;
