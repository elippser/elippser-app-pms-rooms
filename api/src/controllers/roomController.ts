import { Request, Response } from "express";
import { roomService } from "../services/roomService";
import { catchAsync } from "../utils/catch/catchAsync";
import { roomCreateSchema, roomUpdateSchema } from "../validations/validationSchemas";
import { RoomStatus } from "../types/room/roomTypes";

export const roomController = {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const { status, propertyId } = req.query;
    const filters: { status?: RoomStatus; propertyId?: string } = {};
    if (typeof status === "string") filters.status = status as RoomStatus;
    if (typeof propertyId === "string") filters.propertyId = propertyId;

    const rooms = await roomService.getAll(filters);
    res.json(rooms);
  }),

  getById: catchAsync(async (req: Request, res: Response) => {
    const room = await roomService.getById(req.params.id);
    res.json(room);
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const { error, value } = roomCreateSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const room = await roomService.create(value);
    res.status(201).json(room);
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { error, value } = roomUpdateSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const room = await roomService.update(req.params.id, value);
    res.json(room);
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    await roomService.delete(req.params.id);
    res.status(204).send();
  }),
};
