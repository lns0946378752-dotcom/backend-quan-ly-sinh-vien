import { Router } from "express";
import {
  getDanhSachSinhVien,
  getSinhVienTheoMaSV,
  postSinhVien,
} from "../controllers/sinhvien.controller.js";

const sinhVienRouter = Router();

sinhVienRouter.get("/", getDanhSachSinhVien);
sinhVienRouter.get("/:maSV", getSinhVienTheoMaSV);
sinhVienRouter.post("/", postSinhVien);

export default sinhVienRouter;
