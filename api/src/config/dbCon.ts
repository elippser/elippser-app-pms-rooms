import mongoose from "mongoose";
import { logger } from "../utils/logs/logger";

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DATABASE_MDB || "mongodb://localhost:27017/elippser-pms-rooms";
    await mongoose.connect(uri);
    logger.info("MongoDB conectado correctamente");
  } catch (error) {
    logger.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

export { connectDB };
