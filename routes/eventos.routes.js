import express from "express";
import { crearEvento, editarEvento, eliminarEvento, mostrarEvento } from "../controllers/eventos.controller.js";

const router = express.Router();

router.post("/api/eventos", crearEvento);
router.get("/eventos/:usuario", mostrarEvento);
router.delete("/api/eventos/:usuario", eliminarEvento);
router.put("/api/eventos/:usuario", editarEvento);

export default router;