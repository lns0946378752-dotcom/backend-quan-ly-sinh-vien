import type { NextFunction, Request, Response } from "express";
import {
  layDanhSachSinhVien,
  themSinhVien,
  timSinhVienTheoMaSV,
} from "../services/sinhVien.service.js";
import { AppError } from "../utils/AppError.js";

export function getDanhSachSinhVien(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: layDanhSachSinhVien(),
  });
}

export function getSinhVienTheoMaSV(
  req: Request<{ maSV: string }>,
  res: Response,
  next: NextFunction,
): void {
  try {
    const sinhVien = timSinhVienTheoMaSV(req.params.maSV);

    if (!sinhVien) {
      throw new AppError(404, "Không tìm thấy sinh viên.");
    }

    res.status(200).json({
      success: true,
      data: sinhVien,
    });
  } catch (error) {
    next(error);
  }
}

export function postSinhVien(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const sinhVienMoi = themSinhVien(req.body);

    res.status(201).json({
      success: true,
      message: "Thêm sinh viên thành công.",
      data: sinhVienMoi,
    });
  } catch (error) {
    next(error);
  }
}