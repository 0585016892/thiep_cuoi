// ========================================
// GOOGLE APPS SCRIPT API
// ========================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbxXgtR1lTFatRI7weRFHbJTAmwiPqUfS5Yf2sZeeEk-aZKtkuFA66ur3Nj_8MDGP_7bIQ/exec";

// ========================================
// GET
// ========================================

async function getAPI(params = {}) {
  try {
    const query = new URLSearchParams(params);

    const response = await fetch(`${API_URL}?${query.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("GET API ERROR:", error);

    return {
      thanhCong: false,
      thongBao: "Không thể kết nối Google Apps Script.",
    };
  }
}

// ========================================
// POST
// ========================================

async function postAPI(data = {}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("POST API ERROR:", error);

    return {
      thanhCong: false,
      thongBao: "Không thể kết nối Google Apps Script.",
    };
  }
}

// ========================================
// LẤY DANH SÁCH
// ========================================

export async function layDanhSachKhach() {
  return await getAPI({
    action: "layDanhSach",
  });
}

// ========================================
// LẤY KHÁCH
// ========================================

export async function layKhach(id) {
  if (!id) {
    return {
      thanhCong: false,
      thongBao: "Thiếu ID khách mời.",
    };
  }

  return await getAPI({
    action: "layKhach",
    id: String(id),
  });
}

// ========================================
// THÊM KHÁCH
// ========================================

export async function themKhach({
  hoTen,
  soDienThoai = "",
  quanHe = "",
  moi = "Chưa mời",
  xacNhan = "Chưa xác nhận",
  ghiChu = "",
}) {
  if (!hoTen?.trim()) {
    return {
      thanhCong: false,
      thongBao: "Vui lòng nhập họ tên.",
    };
  }

  return await postAPI({
    hanhDong: "themKhach",
    hoTen: hoTen.trim(),
    soDienThoai: String(soDienThoai || "").trim(),
    quanHe: String(quanHe || "").trim(),
    moi,
    xacNhan,
    ghiChu: String(ghiChu || "").trim(),
  });
}

// ========================================
// SỬA KHÁCH
// ========================================

export async function suaKhach({
  id,
  hoTen,
  soDienThoai = "",
  quanHe = "",
  moi = "Chưa mời",
  xacNhan = "Chưa xác nhận",
  ghiChu = "",
}) {
  if (!id) {
    return {
      thanhCong: false,
      thongBao: "Thiếu ID khách mời.",
    };
  }

  if (!hoTen?.trim()) {
    return {
      thanhCong: false,
      thongBao: "Vui lòng nhập họ tên.",
    };
  }

  return await postAPI({
    hanhDong: "suaKhach",
    id: String(id),
    hoTen: hoTen.trim(),
    soDienThoai: String(soDienThoai || "").trim(),
    quanHe: String(quanHe || "").trim(),
    moi,
    xacNhan,
    ghiChu: String(ghiChu || "").trim(),
  });
}

// ========================================
// XÓA KHÁCH
// ========================================

export async function xoaKhach(id) {
  if (!id) {
    return {
      thanhCong: false,
      thongBao: "Thiếu ID khách mời.",
    };
  }

  return await postAPI({
    hanhDong: "xoaKhach",
    id: String(id),
  });
}

// ========================================
// TẠO LINK 1 KHÁCH
// ========================================

export async function taoLink(id) {
  if (!id) {
    return {
      thanhCong: false,
      thongBao: "Thiếu ID khách mời.",
    };
  }

  return await postAPI({
    hanhDong: "taoLink",
    id: String(id),
  });
}

// ========================================
// 🚀 TẠO LINK HÀNG LOẠT
// ========================================

export async function taoLinkHangLoat() {
  return await postAPI({
    hanhDong: "taoLinkHangLoat",
  });
}

// ========================================
// CẬP NHẬT MỜI
// ========================================

export async function capNhatMoi(id, giaTri) {
  return await postAPI({
    hanhDong: "capNhatMoi",
    id: String(id),
    giaTri,
  });
}

// ========================================
// CẬP NHẬT XÁC NHẬN
// ========================================

export async function capNhatXacNhan(id, giaTri) {
  return await postAPI({
    hanhDong: "capNhatXacNhan",
    id: String(id),
    giaTri,
  });
}

// ========================================
// CẬP NHẬT QUAN HỆ
// ========================================

export async function capNhatQuanHe(id, giaTri) {
  return await postAPI({
    hanhDong: "capNhatQuanHe",
    id: String(id),
    giaTri,
  });
}

// ========================================
// CẬP NHẬT GHI CHÚ
// ========================================

export async function capNhatGhiChu(id, giaTri) {
  return await postAPI({
    hanhDong: "capNhatGhiChu",
    id: String(id),
    giaTri,
  });
}
// ========================================
// KHÁCH XÁC NHẬN THAM DỰ
// ========================================

export async function xacNhanThamDu(id, giaTri) {
  if (!id) {
    return {
      thanhCong: false,
      thongBao: "Thiếu ID khách mời.",
    };
  }

  if (!giaTri) {
    return {
      thanhCong: false,
      thongBao: "Thiếu trạng thái xác nhận.",
    };
  }

  return await postAPI({
    hanhDong: "xacNhanThamDu",

    id: String(id),

    giaTri: String(giaTri),
  });
}
export async function layDanhSachGhiChu() {
  return await getAPI({
    action: "layDanhSachGhiChu",
  });
}
// ========================================
// EXPORT DEFAULT
// ========================================

const guestApi = {
  layDanhSachKhach,
  layKhach,
  themKhach,
  suaKhach,
  xoaKhach,
  taoLink,
  taoLinkHangLoat,
  capNhatMoi,
  capNhatXacNhan,
  capNhatQuanHe,
  capNhatGhiChu,
  xacNhanThamDu,
  layDanhSachGhiChu,
};

export default guestApi;
