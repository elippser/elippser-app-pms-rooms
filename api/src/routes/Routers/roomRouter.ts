import { Router } from "express";
import { roomController } from "../../controllers/roomController";
import { authenticateJWT } from "../../middleware/authenticateJWT";
import { requireRole } from "../../middleware/requireRole";
import { ROLES } from "../../constants/appCatalog";

const router = Router();

// Rutas públicas (para desarrollo inicial; luego se pueden proteger)
router.get("/", roomController.getAll);
router.get("/:id", roomController.getById);

// Rutas protegidas
router.post("/", authenticateJWT, requireRole(ROLES.ADMIN, ROLES.MANAGER), roomController.create);
router.patch("/:id", authenticateJWT, requireRole(ROLES.ADMIN, ROLES.MANAGER), roomController.update);
router.delete("/:id", authenticateJWT, requireRole(ROLES.ADMIN), roomController.delete);

export default router;
