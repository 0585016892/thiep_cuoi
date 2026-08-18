import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  Table,
  Input,
  Button,
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Space,
  App,
  Tooltip,
  Modal,
  Form,
  Select,
  Popconfirm,
  Statistic,
  Empty,
  Segmented,
  Dropdown,
  Progress,
} from "antd";

import {
  SearchOutlined,
  CopyOutlined,
  LinkOutlined,
  ReloadOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import {
  layDanhSachKhach,
  themKhach,
  suaKhach,
  xoaKhach,
  taoLink,
  taoLinkHangLoat,
  capNhatMoi,
  capNhatXacNhan,
} from "../api/guestApi";

const { Title, Text } = Typography;
const { Option } = Select;

// ========================================
// STYLES & DANH SÁCH MỐI QUAN HỆ
// ========================================
const BRAND_PRIMARY = "#8B6F47";
const BG_DARK_CARD = "rgba(255, 255, 255, 0.85)";

// Danh sách mối quan hệ
const DANH_SACH_QUAN_HE = [
  "AE họ hàng",
  "Bạn bè",
  "Bạn bè xóm",
  "Cấp 2",
  "Cấp 3",
  "Đại học",
  "Công ty",
  "Gia đình",
  "Đồng nghiệp",
  "Khác",
];

// Định nghĩa màu sắc Badge cho từng loại quan hệ
const QUAN_HE_COLOR_MAP = {
  "Gia đình": "volcano",
  "AE họ hàng": "orange",
  "Bạn bè": "gold",
  "Bạn bè xóm": "lime",
  "Cấp 2": "green",
  "Cấp 3": "cyan",
  "Đại học": "blue",
  "Công ty": "geekblue",
  "Đồng nghiệp": "purple",
  Khác: "magenta",
};

const QuanLyKhachMoiContent = () => {
  const [danhSach, setDanhSach] = useState([]);
  const [dangTai, setDangTai] = useState(true);
  const [dangTaoId, setDangTaoId] = useState(null);
  const [dangTaoHangLoat, setDangTaoHangLoat] = useState(false);

  // Bộ lọc
  const [tuKhoa, setTuKhoa] = useState("");
  const [boLocTrangThai, setBoLocTrangThai] = useState("TAT_CA");
  const [boLocQuanHe, setBoLocQuanHe] = useState("TAT_CA");

  // Modal
  const [modalMo, setModalMo] = useState(false);
  const [dangLuu, setDangLuu] = useState(false);
  const [khachDangSua, setKhachDangSua] = useState(null);

  const [form] = Form.useForm();
  const { message, modal } = App.useApp();

  // ========================================
  // LOAD DATA (Sử dụng useCallback để tránh warning deps)
  // ========================================
  const layDanhSach = useCallback(async () => {
    try {
      setDangTai(true);
      const data = await layDanhSachKhach();
      if (Array.isArray(data)) {
        setDanhSach(data);
      } else {
        message.error(data?.thongBao || "Không thể tải danh sách.");
      }
    } catch (error) {
      console.error(error);
      message.error("Không thể tải danh sách khách mời.");
    } finally {
      setDangTai(false);
    }
  }, [message]);

  useEffect(() => {
    layDanhSach();
  }, [layDanhSach]);

  // ========================================
  // MODAL HANDLERS
  // ========================================
  const moModalThem = () => {
    setKhachDangSua(null);
    form.resetFields();
    form.setFieldsValue({
      moi: "Chưa mời",
      xacNhan: "Chưa xác nhận",
      quanHe: "AE họ hàng",
      ghiChu: "",
    });
    setModalMo(true);
  };

  const moModalSua = (record) => {
    setKhachDangSua(record);
    form.setFieldsValue({
      hoTen: record.hoTen || "",
      soDienThoai: record.soDienThoai || "",
      quanHe: record.quanHe || "",
      moi: record.moi || "Chưa mời",
      xacNhan: record.xacNhan || "Chưa xác nhận",
      ghiChu: record.ghiChu || "",
    });
    setModalMo(true);
  };

  const dongModal = () => {
    if (dangLuu) return;
    setModalMo(false);
    setKhachDangSua(null);
    form.resetFields();
  };

  const luuKhach = async (values) => {
    try {
      setDangLuu(true);
      let result;
      if (khachDangSua) {
        result = await suaKhach({ id: khachDangSua.id, ...values });
      } else {
        result = await themKhach(values);
      }

      if (!result?.thanhCong) {
        message.error(result?.thongBao || "Không thể lưu.");
        return;
      }

      message.success(
        khachDangSua ? "Đã cập nhật khách." : "Đã thêm khách mới.",
      );
      dongModal();
      await layDanhSach();
    } catch (error) {
      console.error(error);
      message.error("Có lỗi khi lưu khách.");
    } finally {
      setDangLuu(false);
    }
  };

  const xoaKhachItem = async (id) => {
    try {
      const result = await xoaKhach(id);
      if (!result?.thanhCong) {
        message.error(result?.thongBao || "Không thể xóa.");
        return;
      }
      message.success("Đã xóa khách mời khỏi danh sách.");
      await layDanhSach();
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi xóa khách.");
    }
  };

  // ========================================
  // XỬ LÝ LINK THIỆP
  // ========================================
  const xuLyTaoLink = async (id) => {
    try {
      setDangTaoId(id);
      const result = await taoLink(id);
      if (!result?.thanhCong) {
        message.error(result?.thongBao || "Không thể tạo link.");
        return;
      }
      message.success("Đã tạo link thiệp!");

      if (result?.khach?.link) {
        try {
          await navigator.clipboard.writeText(result.khach.link);
          message.info("Đã copy link vào bộ nhớ tạm.");
        } catch {}
      }
      await layDanhSach();
    } catch (error) {
      console.error(error);
      message.error("Không thể tạo link.");
    } finally {
      setDangTaoId(null);
    }
  };

  const xuLyTaoLinkHangLoat = () => {
    const chuaCoLink = danhSach.filter((item) => !item.link);
    if (chuaCoLink.length === 0) {
      message.success("Tất cả khách mời đều đã có link.");
      return;
    }

    modal.confirm({
      title: "Tạo link thiệp hàng loạt?",
      icon: <ThunderboltOutlined style={{ color: BRAND_PRIMARY }} />,
      content: `Hệ thống sẽ tiến hành tạo link cho ${chuaCoLink.length} khách mời chưa có link. Tiếp tục?`,
      okText: "Tạo tất cả",
      cancelText: "Hủy",
      okButtonProps: {
        style: { background: BRAND_PRIMARY, borderColor: BRAND_PRIMARY },
      },
      onOk: async () => {
        try {
          setDangTaoHangLoat(true);
          const result = await taoLinkHangLoat();
          if (!result?.thanhCong) {
            message.error(result?.thongBao || "Không thể tạo link hàng loạt.");
            return;
          }
          message.success(
            `Đã khởi tạo thành công ${result.soLuongDaTao} link thiệp!`,
          );
          await layDanhSach();
        } catch (error) {
          console.error(error);
          message.error("Có lỗi xảy ra khi tạo link hàng loạt.");
        } finally {
          setDangTaoHangLoat(false);
        }
      },
    });
  };

  const copyLink = async (link) => {
    if (!link) {
      message.warning("Khách mời này chưa có link thiệp.");
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      message.success("Đã copy link thiệp!");
    } catch {
      message.error("Không thể copy link.");
    }
  };

  // ========================================
  // CẬP NHẬT TRẠNG THÁI QUICK INLINE
  // ========================================
  const xuLyCapNhatMoi = async (record, value) => {
    try {
      const result = await capNhatMoi(record.id, value);
      if (!result?.thanhCong) {
        message.error(result?.thongBao || "Không thể cập nhật.");
        return;
      }
      message.success("Đã cập nhật trạng thái mời.");
      setDanhSach((prev) =>
        prev.map((item) =>
          String(item.id) === String(record.id)
            ? { ...item, moi: value }
            : item,
        ),
      );
    } catch {
      message.error("Cập nhật thất bại.");
    }
  };

  const xuLyCapNhatXacNhan = async (record, value) => {
    try {
      const result = await capNhatXacNhan(record.id, value);
      if (!result?.thanhCong) {
        message.error(result?.thongBao || "Không thể cập nhật.");
        return;
      }
      message.success("Đã cập nhật xác nhận.");
      setDanhSach((prev) =>
        prev.map((item) =>
          String(item.id) === String(record.id)
            ? { ...item, xacNhan: value }
            : item,
        ),
      );
    } catch {
      message.error("Cập nhật thất bại.");
    }
  };

  // ========================================
  // FILTERING LOGIC
  // ========================================
  const danhSachLoc = useMemo(() => {
    const keyword = tuKhoa.trim().toLowerCase();

    return danhSach.filter((khach) => {
      // 1. Lọc theo Từ Khóa
      const matchKeyword =
        !keyword ||
        String(khach.id || "")
          .toLowerCase()
          .includes(keyword) ||
        String(khach.hoTen || "")
          .toLowerCase()
          .includes(keyword) ||
        String(khach.soDienThoai || "")
          .toLowerCase()
          .includes(keyword) ||
        String(khach.quanHe || "")
          .toLowerCase()
          .includes(keyword);

      // 2. Lọc theo Trạng Thái
      let matchStatus = true;
      switch (boLocTrangThai) {
        case "DA_MOI":
          matchStatus = khach.moi === "Đã mời";
          break;
        case "CHUA_MOI":
          matchStatus = khach.moi !== "Đã mời";
          break;
        case "CO":
          matchStatus = khach.xacNhan === "Có";
          break;
        case "KHONG":
          matchStatus = khach.xacNhan === "Không";
          break;
        case "CHUA_XAC_NHAN":
          matchStatus = !khach.xacNhan || khach.xacNhan === "Chưa xác nhận";
          break;
        default:
          matchStatus = true;
      }

      // 3. Lọc theo Nhóm Quan Hệ
      let matchQuanHe = true;
      if (boLocQuanHe !== "TAT_CA") {
        matchQuanHe = khach.quanHe === boLocQuanHe;
      }

      return matchKeyword && matchStatus && matchQuanHe;
    });
  }, [danhSach, tuKhoa, boLocTrangThai, boLocQuanHe]);

  // ========================================
  // THỐNG KÊ (Sử dụng đầy đủ các biến)
  // ========================================
  const tongKhach = danhSach.length;
  const daMoi = danhSach.filter((x) => x.moi === "Đã mời").length;
  const daTaoLink = danhSach.filter((x) => x.link).length;
  const xacNhanCo = danhSach.filter((x) => x.xacNhan === "Có").length;
  const xacNhanKhong = danhSach.filter((x) => x.xacNhan === "Không").length;

  // ========================================
  // TABLE COLUMNS CONFIG
  // ========================================
  const columns = [
    {
      title: "STT",
      width: 60,
      align: "center",
      render: (_, __, index) => (
        <Text type="secondary" style={{ fontWeight: 600 }}>
          {index + 1}
        </Text>
      ),
    },
    {
      title: "Khách mời",
      width: 220,
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: 15, color: "#1F2937" }}>
            {record.hoTen}
          </Text>
          <div
            style={{
              marginTop: 4,
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Tag
              color="gold"
              style={{ borderRadius: 4, margin: 0, fontSize: 11 }}
            >
              ID: {record.id}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      width: 140,
      render: (text) =>
        text ? (
          <Space size={4}>
            <Text>{text}</Text>
          </Space>
        ) : (
          <Text type="secondary" style={{ fontSize: 12, italic: true }}>
            Chưa có
          </Text>
        ),
    },
    {
      title: "Quan hệ",
      dataIndex: "quanHe",
      width: 140,
      render: (text) => {
        if (!text) return <Text type="secondary">-</Text>;
        const color = QUAN_HE_COLOR_MAP[text] || "default";
        return (
          <Tag
            color={color}
            style={{ borderRadius: 12, padding: "2px 10px", fontWeight: 500 }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Mời",
      dataIndex: "moi",
      width: 130,
      render: (value, record) => {
        const isDaMoi = value === "Đã mời";
        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "chua",
                  label: "Chưa mời",
                  onClick: () => xuLyCapNhatMoi(record, "Chưa mời"),
                },
                {
                  key: "da",
                  label: "Đã mời",
                  onClick: () => xuLyCapNhatMoi(record, "Đã mời"),
                },
              ],
            }}
          >
            <Tag
              color={isDaMoi ? "success" : "default"}
              icon={isDaMoi ? <SendOutlined /> : <ClockCircleOutlined />}
              style={{
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: 20,
                fontWeight: 500,
              }}
            >
              {isDaMoi ? "Đã mời" : "Chưa mời"}
            </Tag>
          </Dropdown>
        );
      },
    },
    {
      title: "Xác nhận",
      dataIndex: "xacNhan",
      width: 150,
      render: (value, record) => {
        let color = "warning";
        let icon = <ClockCircleOutlined />;
        let label = "Chưa phản hồi";

        if (value === "Có") {
          color = "processing";
          icon = <CheckCircleOutlined />;
          label = "Sẽ tham dự";
        } else if (value === "Không") {
          color = "error";
          icon = <CloseCircleOutlined />;
          label = "Vắng mặt";
        }

        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "chua",
                  label: "Chưa xác nhận",
                  onClick: () => xuLyCapNhatXacNhan(record, "Chưa xác nhận"),
                },
                {
                  key: "co",
                  label: "Có — Sẽ tham dự",
                  onClick: () => xuLyCapNhatXacNhan(record, "Có"),
                },
                {
                  key: "khong",
                  label: "Không — Vắng mặt",
                  onClick: () => xuLyCapNhatXacNhan(record, "Không"),
                },
              ],
            }}
          >
            <Tag
              color={color}
              icon={icon}
              style={{
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: 20,
                fontWeight: 500,
              }}
            >
              {label}
            </Tag>
          </Dropdown>
        );
      },
    },
    {
      title: "Link thiệp",
      width: 140,
      render: (_, record) =>
        record.link ? (
          <Space size={6}>
            <Tooltip title="Xem trang thiệp">
              <Button
                size="small"
                type="primary"
                ghost
                shape="circle"
                icon={<EyeOutlined />}
                href={record.link}
                target="_blank"
              />
            </Tooltip>
            <Tooltip title="Sao chép link">
              <Button
                size="small"
                shape="circle"
                icon={<CopyOutlined />}
                onClick={() => copyLink(record.link)}
              />
            </Tooltip>
          </Space>
        ) : (
          <Button
            size="small"
            type="dashed"
            icon={<LinkOutlined />}
            loading={dangTaoId === record.id}
            onClick={() => xuLyTaoLink(record.id)}
            style={{
              color: BRAND_PRIMARY,
              borderColor: BRAND_PRIMARY,
              borderRadius: 8,
            }}
          >
            Tạo link
          </Button>
        ),
    },
    {
      title: "Thao tác",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size={2}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined style={{ color: "#4B5563" }} />}
              onClick={() => moModalSua(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa khách mời?"
            description={`Bạn có muốn xóa ${record.hoTen}?`}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
            onConfirm={() => xoaKhachItem(record.id)}
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAF7F2 0%, #F3EDE2 100%)",
        padding: "32px 16px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "auto" }}>
        {/* ==================================
            HEADER BANNER
        ================================== */}
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            marginBottom: 20,
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px rgba(139, 111, 71, 0.05)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <Title
                level={2}
                style={{ margin: 0, color: BRAND_PRIMARY, fontFamily: "serif" }}
              >
                💍 Quản Lý Khách Mời Tiệc Cưới
              </Title>
              <Text type="secondary">
                Quản lý danh sách, phân loại nhóm khách, khởi tạo thiệp mời và
                theo dõi phản hồi
              </Text>
            </div>

            <Space wrap size={12}>
              <Button
                icon={<ReloadOutlined />}
                onClick={layDanhSach}
                loading={dangTai}
                style={{ borderRadius: 10, height: 40 }}
              >
                Làm mới
              </Button>

              <Button
                type="primary"
                icon={<ThunderboltOutlined />}
                loading={dangTaoHangLoat}
                onClick={xuLyTaoLinkHangLoat}
                style={{
                  background: "#A67C52",
                  borderColor: "#A67C52",
                  borderRadius: 10,
                  height: 40,
                  fontWeight: 600,
                }}
              >
                Tạo link hàng loạt
              </Button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={moModalThem}
                style={{
                  background: BRAND_PRIMARY,
                  borderColor: BRAND_PRIMARY,
                  borderRadius: 10,
                  height: 40,
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(139, 111, 71, 0.25)",
                }}
              >
                Thêm khách mời
              </Button>
            </Space>
          </div>
        </Card>

        {/* ==================================
            STATISTICS CARDS
        ================================== */}
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              hoverable
              onClick={() => {
                setBoLocTrangThai("TAT_CA");
                setBoLocQuanHe("TAT_CA");
              }}
              style={{
                borderRadius: 16,
                background: BG_DARK_CARD,
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              }}
            >
              <Statistic
                title={
                  <Text type="secondary" style={{ fontWeight: 600 }}>
                    Tổng khách
                  </Text>
                }
                value={tongKhach}
                prefix={<UserOutlined style={{ color: BRAND_PRIMARY }} />}
                valueStyle={{ color: BRAND_PRIMARY, fontWeight: 700 }}
              />
            </Card>
          </Col>

          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              hoverable
              onClick={() => setBoLocTrangThai("DA_MOI")}
              style={{
                borderRadius: 16,
                background: BG_DARK_CARD,
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              }}
            >
              <Statistic
                title={
                  <Text type="secondary" style={{ fontWeight: 600 }}>
                    Đã mời
                  </Text>
                }
                value={daMoi}
                prefix={<SendOutlined style={{ color: "#10B981" }} />}
                valueStyle={{ color: "#10B981", fontWeight: 700 }}
              />
            </Card>
          </Col>

          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              hoverable
              style={{
                borderRadius: 16,
                background: BG_DARK_CARD,
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              }}
            >
              <Statistic
                title={
                  <Text type="secondary" style={{ fontWeight: 600 }}>
                    Tiến độ tạo link
                  </Text>
                }
                value={daTaoLink}
                suffix={`/ ${tongKhach}`}
                prefix={<LinkOutlined style={{ color: "#8B5CF6" }} />}
                valueStyle={{ color: "#8B5CF6", fontWeight: 700 }}
              />
              <Progress
                percent={
                  tongKhach ? Math.round((daTaoLink / tongKhach) * 100) : 0
                }
                size="small"
                strokeColor="#8B5CF6"
                style={{ marginTop: 4 }}
              />
            </Card>
          </Col>

          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              hoverable
              onClick={() => setBoLocTrangThai("CO")}
              style={{
                borderRadius: 16,
                background: BG_DARK_CARD,
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              }}
            >
              <Statistic
                title={
                  <Text type="secondary" style={{ fontWeight: 600 }}>
                    Xác nhận tham dự
                  </Text>
                }
                value={xacNhanCo}
                suffix={
                  <Text
                    type="secondary"
                    style={{ fontSize: 13, fontWeight: 400 }}
                  >
                    ({xacNhanKhong} vắng)
                  </Text>
                }
                prefix={<CheckCircleOutlined style={{ color: "#2563EB" }} />}
                valueStyle={{ color: "#2563EB", fontWeight: 700 }}
              />
            </Card>
          </Col>
        </Row>

        {/* ==================================
            FILTER & TOOLBAR
        ================================== */}
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            marginBottom: 20,
            background: BG_DARK_CARD,
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
          bodyStyle={{ padding: "16px 20px" }}
        >
          <Row gutter={[12, 12]} align="middle">
            {/* TÌM KIẾM TỪ KHÓA */}
            <Col xs={24} md={8}>
              <Input
                size="large"
                allowClear
                prefix={<SearchOutlined style={{ color: "#9CA3AF" }} />}
                placeholder="Tìm kiếm tên, SĐT, ghi chú..."
                value={tuKhoa}
                onChange={(e) => setTuKhoa(e.target.value)}
                style={{ borderRadius: 10, background: "#FAFAFA" }}
              />
            </Col>

            {/* LỌC THEO QUAN HỆ */}
            <Col xs={24} sm={12} md={6}>
              <Select
                size="large"
                value={boLocQuanHe}
                onChange={(val) => setBoLocQuanHe(val)}
                style={{ width: "100%", borderRadius: 10 }}
                suffixIcon={<TeamOutlined style={{ color: BRAND_PRIMARY }} />}
              >
                <Option value="TAT_CA">✨ Tất cả mối quan hệ</Option>
                {DANH_SACH_QUAN_HE.map((item) => (
                  <Option key={item} value={item}>
                    🏷️ {item}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* LỌC TRẠNG THÁI (TAB SEGMENTED) */}
            <Col
              xs={24}
              sm={12}
              md={10}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Segmented
                block
                options={[
                  { label: "Tất cả", value: "TAT_CA" },
                  { label: "Đã mời", value: "DA_MOI" },
                  { label: "Chưa mời", value: "CHUA_MOI" },
                  { label: "Sẽ đi", value: "CO" },
                  { label: "Vắng", value: "KHONG" },
                  { label: "Chưa phản hồi", value: "CHUA_XAC_NHAN" },
                ]}
                value={boLocTrangThai}
                onChange={(val) => setBoLocTrangThai(val)}
                style={{
                  padding: 4,
                  borderRadius: 10,
                  background: "#EFECE6",
                  maxWidth: "100%",
                  overflowX: "auto",
                }}
              />
            </Col>
          </Row>
        </Card>

        {/* ==================================
            DATA TABLE
        ================================== */}
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: BG_DARK_CARD,
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            rowKey="id"
            columns={columns}
            dataSource={danhSachLoc}
            loading={dangTai}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    tuKhoa || boLocQuanHe !== "TAT_CA"
                      ? "Không tìm thấy khách mời phù hợp bộ lọc"
                      : "Chưa có dữ liệu khách mời"
                  }
                />
              ),
            }}
            pagination={{
              pageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["10", "15", "30", "50", "100"],
              showTotal: (total) => `Tổng cộng ${total} khách mời`,
              style: { padding: "16px 24px", margin: 0 },
            }}
            scroll={{ x: 1100 }}
          />
        </Card>
      </div>

      {/* ==================================
          MODAL THÊM / SỬA KHÁCH MỜI
      ================================== */}
      <Modal
        open={modalMo}
        title={
          <Text strong style={{ fontSize: 18, color: BRAND_PRIMARY }}>
            {khachDangSua ? "✏️ Chỉnh Sửa Khách Mời" : "➕ Thêm Khách Mời Mới"}
          </Text>
        }
        onCancel={dongModal}
        footer={null}
        destroyOnClose
        centered
        style={{ borderRadius: 16, overflow: "hidden" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={luuKhach}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Họ và tên khách mời"
            name="hoTen"
            rules={[{ required: true, message: "Vui lòng nhập họ tên." }]}
          >
            <Input
              size="large"
              placeholder="Ví dụ: Nguyễn Văn A"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="soDienThoai">
                <Input
                  size="large"
                  placeholder="0987654321"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mối quan hệ" name="quanHe">
                <Select
                  size="large"
                  placeholder="Chọn quan hệ"
                  allowClear
                  style={{ borderRadius: 8 }}
                >
                  {DANH_SACH_QUAN_HE.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Trạng thái mời" name="moi">
                <Select size="large" style={{ borderRadius: 8 }}>
                  <Option value="Chưa mời">Chưa mời</Option>
                  <Option value="Đã mời">Đã mời</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Xác nhận tham dự" name="xacNhan">
                <Select size="large" style={{ borderRadius: 8 }}>
                  <Option value="Chưa xác nhận">Chưa xác nhận</Option>
                  <Option value="Có">Có (Tham dự)</Option>
                  <Option value="Không">Không (Vắng)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Ghi chú thêm" name="ghiChu">
            <Input.TextArea
              rows={3}
              placeholder="Ví dụ: Đi cùng người yêu..."
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Space
            style={{ width: "100%", justifyContent: "flex-end", marginTop: 12 }}
          >
            <Button
              onClick={dongModal}
              disabled={dangLuu}
              style={{ borderRadius: 8 }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={dangLuu}
              style={{
                background: BRAND_PRIMARY,
                borderColor: BRAND_PRIMARY,
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              {khachDangSua ? "Lưu thay đổi" : "Thêm khách"}
            </Button>
          </Space>
        </Form>
      </Modal>
    </motion.div>
  );
};

// ========================================
// APP PROVIDER WRAPPER
// ========================================
const QuanLyKhachMoi = () => (
  <App>
    <QuanLyKhachMoiContent />
  </App>
);

export default QuanLyKhachMoi;
