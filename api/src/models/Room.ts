import mongoose, { Schema } from "mongoose";
import { IRoomDocument, RoomStatus } from "../types/room/roomTypes";

const RoomSchema = new Schema<IRoomDocument>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true, uppercase: true },
    status: {
      type: String,
      enum: Object.values(RoomStatus),
      default: RoomStatus.AVAILABLE,
    },
    capacity: { type: Number, min: 1 },
    description: { type: String, maxlength: 500 },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property" },
  },
  { timestamps: true }
);

RoomSchema.index({ code: 1 });
RoomSchema.index({ status: 1 });
RoomSchema.index({ propertyId: 1 });

export const Room = mongoose.model<IRoomDocument>("Room", RoomSchema);
