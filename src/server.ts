import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import sinhVienRouter from "./routes/sinhVien.routes.js";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(loggerMiddleware);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Backend quản lý sinh viên đang chạy." });
});

app.use("/api/v1/sinh-vien", sinhVienRouter);

app.use((_req, _res, next) => {
  next(new AppError(404, "Không tìm thấy đường dẫn."));
});

app.use(errorMiddleware);

const port = Number(process.env.PORT ?? 5000);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
