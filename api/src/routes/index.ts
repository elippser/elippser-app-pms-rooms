import { Router } from "express";
import roomRouter from "./Routers/roomRouter";
import { API_VERSION } from "../constants/appCatalog";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.json({ status: "ok", version: API_VERSION });
});

// API v1
router.use(`/api/${API_VERSION}/rooms`, roomRouter);

export default router;
