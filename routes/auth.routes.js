import express from "express";
import { procesarLogin, mostrarLogin } from "../controllers/auth.controller";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/api/login", procesarLogin);

export default router;