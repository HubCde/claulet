import express from "express";
import { crearEvento, mostrarEvento } from "../controllers/eventos.controller";

const router = express.Router();

router.post("/api/eventos", crearEvento);
router.get("/eventos/:usuario", mostrarEvento);

export default router;