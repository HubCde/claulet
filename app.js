import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let usuarios = {
  admin: { contrasena: "admin123", rol: "admin" },
};

// Empaquetar y desempaquetar json
const guardarUsuarios = () => {
  fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
};

const cargarUsuarios = () => {
  if (fs.existsSync("usuarios.json")) {
    usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf8"));
  }
};

cargarUsuarios();
// rutas
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/api/login", (req, res) => {
  const { usuario, contrasena } = req.body;
  const user = usuarios[usuario];

  if (user && user.contrasena === contrasena) {
    let ruta;

    switch (user.rol) {
      case "admin":
        ruta = "/admin";
        break;
      case "host":
        ruta = "/host";
        break;
      case "organizador":
        ruta = "/organizador";
        break;
      default:
        ruta = `/eventos/${usuario}`;
        break;
    }
    return res.json({ redireccion: ruta });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
});

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
