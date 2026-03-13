import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logs/logger";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "default-secret";
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as any,
    };
    next();
  } catch (err) {
    logger.warn("JWT inválido o expirado");
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};
