import express from "express";
import { procesarLogin, mostrarLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/api/login", procesarLogin);

export default router;