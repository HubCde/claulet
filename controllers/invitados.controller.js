import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import csvParser from "csv-parser";
import {
  cargarInvitados,
  guardarInvitados,
} from "../models/invitados.models.js";
import { generarToken, generarLink } from "../utils/token.js";

export const subirListaInvitados = (req, res) => {
  const { evento } = req.body; // evento viene en el formData
  const archivo = req.file;

  if (!archivo) {
    return res.status(400).json({ error: "No se subió ningún archivo" });
  }

  if (!evento) {
    // Importante validar que se reciba el evento para asignar los invitados
    fs.unlinkSync(archivo.path);
    return res.status(400).json({ error: "No se especificó el evento" });
  }

  const ext = path.extname(archivo.originalname).toLowerCase();

  if (ext === ".csv") {
    const invitados = [];

    fs.createReadStream(archivo.path)
      .pipe(csvParser())
      .on("data", (row) => {
        invitados.push({
          nombre: row.nombre || "",
          confirmar: row.confirmar || "",
          lada: row.lada || "",
          whats: row.whats || "",
          urlInv: row.urlInv || "",
          coments: row.coments || "",
          estatus: row.estatus || "",
        });
      })
      .on("end", () => {
        const data = cargarInvitados();
        if (!data[evento]) data[evento] = [];

        invitados.forEach((inv) => {
          if (!inv.token || !inv.link) {
            const pases = parseInt(inv.confirmar) || 1;
            const token = generarToken(inv.nombre, pases);
            const link = generarLink(inv.nombre, token);
            inv.token = token;
            inv.link = link;
          }
          data[evento].push(inv)
        });

        guardarInvitados(data);

        fs.unlinkSync(archivo.path); // borrar archivo temporal

        res
          .status(200)
          .json({ mensaje: "Lista CSV subida y procesada exitosamente" });
      })
      .on("error", (error) => {
        console.error("Error leyendo CSV:", error);
        fs.unlinkSync(archivo.path);
        res.status(500).json({ error: "Error al procesar el archivo CSV" });
      });
  } else if (ext === ".xlsx") {
    try {
      const workbook = xlsx.readFile(archivo.path);
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const invitados = xlsx.utils.sheet_to_json(hoja);

      const data = cargarInvitados();
      if (!data[evento]) data[evento] = [];

      invitados.forEach((inv) => {
        const pases = parseInt(inv.confirmar) || 1;
        const token = generarToken(inv.nombre, pases);
        const link = generarLink(inv.nombre, token);
        data[evento].push({
          nombre: inv.nombre || "",
          confirmar: inv.confirmar || "",
          lada: inv.lada || "",
          whats: inv.whats || "",
          urlInv: inv.urlInv || "",
          coments: inv.coments || "",
          estatus: inv.estatus || "",
          token,
          link
        });
      });

      guardarInvitados(data);

      fs.unlinkSync(archivo.path);

      res
        .status(200)
        .json({ mensaje: "Lista Excel subida y procesada exitosamente" });
    } catch (error) {
      console.error("Error leyendo Excel:", error);
      fs.unlinkSync(archivo.path);
      res.status(500).json({ error: "Error al procesar el archivo Excel" });
    }
  } else {
    fs.unlinkSync(archivo.path);
    res.status(400).json({ error: "Formato de archivo no soportado" });
  }
};

export const agregarInvitado = (req, res) => {
  const { evento } = req.params;
  const { nombre, confirmar, lada, whats, urlInv, coments, estatus } = req.body;
  console.log("🚀 Se recibieron los datos correctamente 😎");
  console.log(req.body);

  if (
    !nombre ||
    !confirmar ||
    !lada ||
    !whats ||
    !urlInv ||
    !coments ||
    !estatus
  ) {
    console.log("🤦‍♂️ Tsss te faltaron datos");
    return res.status(400).json({ error: "Faltan datos del invitado" });
  }

  const data = cargarInvitados();

  if (!data[evento]) data[evento] = [];
  const pases = parseInt(confirmar) || 1;
  const token = generarToken(nombre, pases);
  const link = generarLink(nombre, token);

  data[evento].push({
    nombre,
    confirmar,
    lada,
    whats,
    urlInv,
    coments,
    estatus,
    token,
    link
  });

  guardarInvitados(data);

  res.status(201).json({ mensaje: "Invitado agregado correctamente" });
};

export const obtenerInvitadosPorEvento = (req, res) => {
  const { evento } = req.params;
  const data = cargarInvitados();

  if (!data[evento]) {
    return res.json([]); // Retorna vacío si no hay invitados para ese evento
  }

  res.json(data[evento]); // Retorna lista de invitados
};

export const actualizarInvitado = (req, res) => {
  const { evento } = req.params;
  const { nombre, confirmar, lada, whats, urlInv, coments, estatus } = req.body;

  console.log("🚀 Se recibieron los datos correctamente 😎");
  console.log(req.body);

  if (
    !nombre ||
    !confirmar ||
    !lada ||
    !whats ||
    !urlInv ||
    !coments ||
    !estatus
  ) {
    console.log("🤦‍♂️ Tsss te faltaron datos");
    return res.status(400).json({ error: "Faltan datos del invitado" });
  }

  const data = cargarInvitados();

  if (!data[evento]) {
    return res.status(404).json({ mensaje: "Evento no encontrado" });
  }

  const invitados = data[evento];
  const index = invitados.findIndex((inv) => inv.nombre === nombre);

  if (index === -1) {
    return res.status(404).json({
      error: `Invitado "${nombre}" no encontrado en el evento "${evento}"`,
    });
  }

  // Actualizar los datos del invitado
  const pases = parseInt(confirmar) || 1;
  const token = generarToken(nombre, pases);
  const link = generarLink(nombre, token);
  data[evento][index] = {
    nombre,
    confirmar,
    lada,
    whats,
    urlInv,
    coments,
    estatus,
    token,
    link
  };

  guardarInvitados(data);
  res.json({
    mensaje: "Invitado actualizado correctamente",
    invitado: data[evento][index],
  });
};

export const eliminarInvitado = (req, res) => {
  const { evento, whats } = req.params;

  console.log("🚀 Se recibieron los datos DELETE");
  console.log(req.params);
  const data = cargarInvitados();

  if (!data[evento]) {
    return res.status(404).json({ mensaje: "Evento no encontrado" });
  }

  const invitados = data[evento];
  const index = invitados.findIndex((inv) => inv.whats === whats);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Invitado no encontrado" });
  }

  // Elimina al invitado encontrado
  data[evento].splice(index, 1);

  // Puedes eliminar el evento si ya no quedan invitados
  // if (data[evento].length === 0) delete data[evento];

  guardarInvitados(data);
  res.json({ mensaje: "Invitado eliminado exitosamente" });
};
