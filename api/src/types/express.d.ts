import { Role } from "../constants/appCatalog";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}
