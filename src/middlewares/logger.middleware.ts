import type { RequestHandler } from "express";

export const loggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
