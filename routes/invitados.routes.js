import express from "express";
import { agregarInvitado, obtenerInvitadosPorEvento, subirListaInvitados } from "../controllers/invitados.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("archivo"), subirListaInvitados);
router.post("/:evento", agregarInvitado);
router.get("/:evento", obtenerInvitadosPorEvento); 

export default router;
