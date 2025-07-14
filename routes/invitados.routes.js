import express from "express";
import { agregarInvitado, obtenerInvitadosPorEvento } from "../controllers/invitados.controller.js";

const router = express.Router();

router.post("/:evento", agregarInvitado);
router.get("/:evento", obtenerInvitadosPorEvento); // 🆕 nueva ruta

export default router;
