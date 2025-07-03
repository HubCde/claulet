import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Renderiza la vista del dash board inicial. (tener cuidado)
app.get("/admin", (req, res) => {
  res.render("dashboard_admin.ejs");
});

app.get("/host", (req, res) => {
  res.render("dashboard_host.ejs");
});

app.get("/organizador", (req, res) => {
  res.render("dashboard_organizador.ejs");
});

app.get("/scanner", (req, res) => {
  res.render("scanner.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log("Servidor de claudet corriendo en http://localhost:3000");
  console.log("Servidor de admin corriendo en http://localhost:3000/admin");
  console.log("Servidor de host corriendo en http://localhost:3000/host");
  console.log(
    "Servidor de organizador corriendo en http://localhost:3000/organizador"
  );
  console.log("Servidor de login corriendo en http://localhost:3000/login");
  console.log("Servidor de scanner corriendo en http://localhost:3000/scanner");
});
