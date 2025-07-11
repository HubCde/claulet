import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ejs from "ejs";
import { applyStaticMiddleware } from "./middleware/static.middleware.js";
import { applyBodyParserMiddleware } from "./middleware/bodyParser.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
applyStaticMiddleware(app, __dirname);
applyBodyParserMiddleware(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let usuarios = {
  admin: { contrasena: "admin123", rol: "admin" },
};

const rutaUsuarios = path.join(__dirname, "usuarios.json");
const rutaEventos = path.join(__dirname, "eventos.json");
const plantillaPath = path.join(__dirname, "views", "eventos", "base.ejs");

const guardarUsuarios = () => {
  fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
};

const cargarUsuarios = () => {
  if (fs.existsSync("usuarios.json")) {
    usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf8"));
  }
};
cargarUsuarios();

const cargarEventos = () => {
  if (fs.existsSync(rutaEventos)) {
    const contenido = fs.readFileSync(rutaEventos, "utf8");
    return contenido ? JSON.parse(contenido) : [];
  }
  return [];
};

const guardarEventos = (eventos) => {
  fs.writeFileSync(rutaEventos, JSON.stringify(eventos, null, 2));
};

// rutas
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/api/login", (req, res) => {
  const { usuario, contrasena } = req.body;
  const user = usuarios[usuario];

  if (user && user.contrasena === contrasena) {
    const ruta = user.rol === "admin" ? "/admin" : `/eventos/${usuario}`;
    return res.json({ redireccion: ruta });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
});

//Renderiza la vista del dash board inicial. (tener cuidado)
app.get("/admin", (req, res) => {
  res.render("dashboard_admin.ejs");
});

app.post("/api/eventos", async (req, res) => {
  const { usuario, contrasena, titulo, descripcion, fecha, hora, lugar } =
    req.body;

  if (
    !usuario ||
    !contrasena ||
    !titulo ||
    !descripcion ||
    !fecha ||
    !hora ||
    !lugar
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  if (usuarios[usuario]) {
    return res.status(409).json({ error: "Usuario ya existe" });
  }

  // Guardar usuario
  usuarios[usuario] = { contrasena, rol: "evento" };
  guardarUsuarios();

  // Guardar evento
  const eventos = cargarEventos();
  eventos.push({ usuario, titulo, descripcion, fecha, hora, lugar });
  guardarEventos(eventos);

  // Ruta de plantilla y de destino
  const plantillaPath = path.join(__dirname, "views", "eventos", "base.ejs");
  const destinoPath = path.join(
    __dirname,
    "views",
    "eventos",
    `${usuario}.ejs`
  );

  // Renderizar con EJS
  try {
    const html = await ejs.renderFile(plantillaPath, {
      titulo,
      descripcion,
      fecha,
      hora,
      lugar,
    });

    fs.writeFileSync(destinoPath, html);
    res.status(201).json({ mensaje: "Evento creado correctamente" });
  } catch (err) {
    console.error("Error al renderizar plantilla:", err);
    res.status(500).json({ error: "Error al generar plantilla del evento" });
  }
});

app.get("/eventos/:usuario", (req, res) => {
  const { usuario } = req.params;
  if (!usuarios[usuario]) return res.status(404).send("Evento no encontrado");
  res.render(`eventos/${usuario}`);
});

//Renderiza la vista del dash board organizador. (tener cuidado)
app.get("/organizador", (req, res) => {
  res.render("dashboard_organizador.ejs");
});

//Renderiza la vista del dash board host. (tener cuidado)
app.get("/host", (req, res) => {
  res.render("dashboard_host.ejs");
});

//Renderiza la vista del dash board inicial. (tener cuidado)
app.get("/scanner", (req, res) => {
  res.render("scanner.ejs");
});



export default app;
