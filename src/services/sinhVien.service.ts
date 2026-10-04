import type { SinhVienDTO } from "../dtos/sinhVien.dto.js";
import { AppError } from "../utils/AppError.js";

// Dữ liệu chỉ được giữ trong bộ nhớ và sẽ trở về ban đầu khi khởi động lại server.
const danhSachSinhVien: SinhVienDTO[] = [
  {
    maSV: "SV001",
    hoTen: "Minh Nhật",
    email: "minhnhat@example.com",
    maLop: "25CT114",
  },
  {
    maSV: "SV002",
    hoTen: "Ngọc Mai",
    email: "ngocmai@example.com",
    maLop: "25CT114",
  },
];

function laDoiTuong(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function layDanhSachSinhVien(): SinhVienDTO[] {
  return danhSachSinhVien.map((sinhVien) => ({ ...sinhVien }));
}

export function timSinhVienTheoMaSV(maSV: string): SinhVienDTO | undefined {
  const sinhVien = danhSachSinhVien.find((item) => item.maSV === maSV);
  return sinhVien ? { ...sinhVien } : undefined;
}

export function themSinhVien(input: unknown): SinhVienDTO {
  if (!laDoiTuong(input)) {
    throw new AppError(400, "Dữ liệu sinh viên phải là một đối tượng.");
  }

  const { maSV, hoTen, email, maLop } = input;

  if (
    typeof maSV !== "string" ||
    typeof hoTen !== "string" ||
    typeof email !== "string" ||
    typeof maLop !== "string"
  ) {
    throw new AppError(
      400,
      "Các trường maSV, hoTen, email và maLop đều phải là chuỗi.",
    );
  }

  const sinhVienMoi: SinhVienDTO = {
    maSV: maSV.trim(),
    hoTen: hoTen.trim(),
    email: email.trim(),
    maLop: maLop.trim(),
  };

  if (!/^SV\d{3}$/.test(sinhVienMoi.maSV)) {
    throw new AppError(400, "Mã sinh viên phải có dạng SV001.");
  }

  if (!sinhVienMoi.hoTen || !sinhVienMoi.maLop) {
    throw new AppError(400, "Họ tên và mã lớp không được để trống.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sinhVienMoi.email)) {
    throw new AppError(400, "Email không hợp lệ.");
  }

  if (danhSachSinhVien.some((item) => item.maSV === sinhVienMoi.maSV)) {
    throw new AppError(400, "Mã sinh viên đã tồn tại.");
  }

  danhSachSinhVien.push(sinhVienMoi);
  return { ...sinhVienMoi };
}
