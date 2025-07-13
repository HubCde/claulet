import express from "express";
import { crearEvento, eliminarEvento, mostrarEvento } from "../controllers/eventos.controller.js";

const router = express.Router();

router.post("/api/eventos", crearEvento);
router.get("/eventos/:usuario", mostrarEvento);
router.delete("/api/eventos/:usuario", eliminarEvento);

export default router;