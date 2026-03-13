import { Document } from "mongoose";

export interface IRoom {
  name: string;
  code: string;
  status: RoomStatus;
  capacity?: number;
  description?: string;
  propertyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoomDocument extends IRoom, Document {}

export enum RoomStatus {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
  CLEANING = "cleaning",
  OUT_OF_SERVICE = "out_of_service",
}
