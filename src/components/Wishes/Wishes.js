import React, { useEffect, useState } from "react";

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Avatar,
  Badge,
  Button,
  Stack,
} from "@mantine/core";
import "./Wishes.css";
import { IconHeart, IconCheck, IconGlassFull } from "@tabler/icons-react";

import { motion } from "framer-motion";

function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [visible, setVisible] = useState(9);

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
  console.log(wishes);

  return (
    <div
      style={{
        background: "#faf7f2",
        padding: "100px 20px",
      }}
    >
      <Container size="lg">
        {/* Header */}
        <Stack align="center" mb={60}>
          <Title order={1} className="wishes-title_h2">
            Sổ Lưu Bút
          </Title>

          <Text c="dimmed" ta="center" maw={600}>
            Những lời chúc chân thành sẽ trở thành kỷ niệm đẹp nhất của chúng
            mình 🤍
          </Text>
        </Stack>

        {/* List */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {wishes.slice(0, visible).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Card
                radius="xl"
                shadow="sm"
                padding="lg"
                withBorder
                style={{
                  height: "100%",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Group mb="md">
                  <Avatar radius="xl" color="pink" variant="light">
                    {item.name?.charAt(0)?.toUpperCase()}
                  </Avatar>

                  <div>
                    <Text fw={600}>{item.name}</Text>

                    <Badge
                      mt={4}
                      radius="sm"
                      color={item.attend === "Tham dự" ? "green" : "yellow"}
                      leftSection={
                        item.attend === "Tham dự" ? (
                          <IconCheck size={12} />
                        ) : (
                          <IconGlassFull size={12} />
                        )
                      }
                    >
                      {item.attend === "Có tham dự"
                        ? "Sẽ tham dự"
                        : "Gửi lời chúc"}
                    </Badge>
                  </div>
                </Group>

                <Text
                  size="sm"
                  c="dimmed"
                  style={{
                    lineHeight: 1.8,
                  }}
                >
                  <IconHeart
                    size={14}
                    style={{
                      display: "inline",
                      marginRight: 8,
                      color: "#ff6b81",
                    }}
                  />
                  {item.message}
                </Text>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* Load more */}
        {visible < wishes.length && (
          <Group justify="center" mt={50}>
            <Button
              radius="xl"
              size="md"
              color="dark"
              onClick={() => setVisible((v) => v + 9)}
            >
              Xem thêm
            </Button>
          </Group>
        )}
      </Container>
    </div>
  );
}

export default Wishes;
