import express from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./utils/logs/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ message: err.message || "Error interno del servidor" });
});

export default app;
