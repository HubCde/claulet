import { getUsuario, crearUsuario } from "../models/usuarios.models.js";
import { guardarEventos, cargarEventos } from "../models/eventos.models.js";
import path from "path";
import { fileURLToPath } from "url"; 
import ejs from "ejs";
import fs from "fs";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearEvento = async (req, res) => {
    console.log("📥 Datos recibidos en /api/eventos:", req.body);
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
        console.log("❌ Faltan datos del formulario");
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    if (getUsuario(usuario)) {
        console.log("⚠️ Usuario ya existe:", usuario);
        return res.status(409).json({ error: "Usuario ya existe" });
    }

    console.log("✅ Usuario nuevo, procediendo a crear");

    // Crear usuario
    crearUsuario(usuario, { contrasena, rol: 'evento' });

    // Guardar evento
    const eventos = cargarEventos();
    eventos.push({ usuario, titulo, descripcion, fecha, hora, lugar });
    guardarEventos(eventos);

    // Ruta de plantilla y de destino
    const plantillaPath = path.join(__dirname, "../views/eventos/base.ejs");
    const destinoPath = path.join(__dirname, "../views/eventos",`${usuario}.ejs`);

    console.log("📄 Ruta plantilla:", plantillaPath);
    console.log("📝 Ruta destino:", destinoPath);
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
        console.log("✅ Plantilla creada correctamente para:", usuario);
        res.status(201).json({ mensaje: "Evento creado correctamente" });
    } catch (err) {
        console.error("Error al renderizar plantilla:", err);
        console.error("❌ Error al renderizar plantilla:", err.message);
        res.status(500).json({ error: "Error al generar plantilla del evento" });
    }
};

export const mostrarEvento = (req, res) => {
  const { usuario } = req.params;
  if (!getUsuario(usuario)) return res.status(404).send("Evento no encontrado");
  res.render(`eventos/${usuario}`);
};

export const eliminarEvento = (req, res) => {
  console.log("📥 Parámetros recibidos:", req.params); 
  const { usuario } = req.params;

  console.log("🔍 Eliminando evento del usuario:", usuario);

  const eventos = cargarEventos();
  const eventosActualizados = eventos.filter(e => e.usuario !== usuario);

  if (eventos.length === eventosActualizados.length) {
    return res.status(404).json({ error: "Evento no encontrado" });
  }

  guardarEventos(eventosActualizados);

  const rutaUsuarios = "usuarios.json";
  let usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf8'));
  delete usuarios[usuario];
  fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));

  const rutaVista = path.join(__dirname, '../views/eventos', `${usuario}.ejs`);
  if (fs.existsSync(rutaVista)) fs.unlinkSync(rutaVista);

  res.json({ mensaje: "Evento eliminado correctamente" });
};

export const editarEvento = (req, res) => {
    const { usuario } = req.params;
    const { titulo, descripcion, fecha, hora, lugar } = req.body;

    const eventos = cargarEventos();
    const index = eventos.findIndex(e => e.usuario === usuario);

    if (index === -1) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    eventos[index] = { ...eventos[index], titulo, descripcion, fecha, hora, lugar };
    guardarEventos(eventos);

    res.json({ mensaje: 'Evento actualizado correctamente🤙' });
};

export const cambiarContrasenas = (req, res) => {
  const { usuario } = req.params;
  const { contrasena_organizador, contrasena_scanner } = req.body;

  const rutaUsuarios = "usuarios.json";
  const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, "utf8"));

  if (!usuarios[usuario]) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  usuarios[usuario].contrasena_organizador = contrasena_organizador;
  usuarios[usuario].contrasena_scanner = contrasena_scanner;

  fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));

  res.json({ mensaje: "✅ Contraseñas actualizadas correctamente" });
};


