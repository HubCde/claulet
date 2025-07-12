import { cargarEventos } from "../models/eventos.models.js";

export const mostrarDashboardAdmin = (req, res) => {
    const eventos = cargarEventos();
    res.render("dashboard_admin.ejs", {eventos})
};
export const mostrarDashboardHost = (req, res) => res.render('dashboard_host.ejs');
export const mostrarDashboardOrganizador = (req, res) => res.render('dashboard_organizador.ejs');
export const mostrarScanner = (req, res) => res.render('scanner.ejs');

