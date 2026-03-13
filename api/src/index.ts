import dotenv from "dotenv";
import http from "http";
import app from "./server";
import { connectDB } from "./config/dbCon";
import { logger } from "./utils/logs/logger";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    logger.info(`Servidor escuchando en puerto ${PORT}`);
  });
};

startServer().catch((err) => {
  logger.error("Error al iniciar el servidor:", err);
  process.exit(1);
});
