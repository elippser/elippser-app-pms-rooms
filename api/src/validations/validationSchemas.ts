import Joi from "joi";
import { RoomStatus } from "../types/room/roomTypes";

export const roomCreateSchema = Joi.object({
  name: Joi.string().required().min(1).max(100),
  code: Joi.string().required().min(1).max(20),
  status: Joi.string()
    .valid(...Object.values(RoomStatus))
    .default(RoomStatus.AVAILABLE),
  capacity: Joi.number().integer().min(1).optional(),
  description: Joi.string().max(500).optional(),
  propertyId: Joi.string().optional(),
});

export const roomUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  code: Joi.string().min(1).max(20).optional(),
  status: Joi.string()
    .valid(...Object.values(RoomStatus))
    .optional(),
  capacity: Joi.number().integer().min(1).optional(),
  description: Joi.string().max(500).optional(),
  propertyId: Joi.string().optional(),
}).min(1);
