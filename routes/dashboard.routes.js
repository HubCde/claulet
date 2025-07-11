import express from "express";
import { mostrarDashboardAdmin, mostrarDashboardHost, mostrarDashboardOrganizador, mostrarScanner } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/admin", mostrarDashboardAdmin);
router.get("/organizador", mostrarDashboardOrganizador);
router.get("/host", mostrarDashboardHost);
router.get("/scanner", mostrarScanner);

export default router;

