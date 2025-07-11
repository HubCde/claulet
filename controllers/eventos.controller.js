import { getUsuario, crearUsuario } from "../models/usuarios.models";
import { guardarEventos, cargarEventos } from "../models/eventos.models";
import path from "path";
import { fileURLToPath } from "url"; 
import ejs from "ejs";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearEvento = async (req, res) => {
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

    if (getUsuario(usuario)) {
        return res.status(409).json({ error: "Usuario ya existe" });
    }

    // Crear usuario
    crearUsuario(usuario, { contrasena, rol: 'evento' });

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
};

export const mostrarEvento = (req, res) => {
  const { usuario } = req.params;
  if (!getUsuario(usuario)) return res.status(404).send("Evento no encontrado");
  res.render(`eventos/${usuario}`);
};