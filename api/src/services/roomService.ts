import { Room } from "../models/Room";
import { IRoom, RoomStatus } from "../types/room/roomTypes";

export const roomService = {
  async getAll(filters?: { status?: RoomStatus; propertyId?: string }) {
    const query: Record<string, unknown> = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.propertyId) query.propertyId = filters.propertyId;
    return Room.find(query).sort({ code: 1 }).lean();
  },

  async getById(id: string) {
    const room = await Room.findById(id).lean();
    if (!room) throw new Error("Habitación no encontrada");
    return room;
  },

  async create(data: Omit<IRoom, "createdAt" | "updatedAt">) {
    const existing = await Room.findOne({ code: data.code.toUpperCase() });
    if (existing) throw new Error("Ya existe una habitación con ese código");
    const room = new Room(data);
    await room.save();
    return room.toObject();
  },

  async update(id: string, data: Partial<IRoom>) {
    const room = await Room.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
    if (!room) throw new Error("Habitación no encontrada");
    return room;
  },

  async delete(id: string) {
    const result = await Room.findByIdAndDelete(id);
    if (!result) throw new Error("Habitación no encontrada");
    return { deleted: true };
  },
};
