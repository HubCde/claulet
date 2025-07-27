import express from "express";
import { agregarInvitado, obtenerInvitadosPorEvento, subirListaInvitados, actualizarInvitado, eliminarInvitado } from "../controllers/invitados.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("archivo"), subirListaInvitados);
router.post("/:evento", agregarInvitado);
router.get("/:evento", obtenerInvitadosPorEvento); 
router.put("/:evento", actualizarInvitado);
router.delete('/:evento/:whats', eliminarInvitado);

export default router;
