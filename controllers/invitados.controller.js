import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import csvParser from "csv-parser";
import { cargarInvitados, guardarInvitados } from "../models/invitados.models.js";

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

        invitados.forEach((inv) => data[evento].push(inv));

        guardarInvitados(data);

        fs.unlinkSync(archivo.path); // borrar archivo temporal

        res.status(200).json({ mensaje: "Lista CSV subida y procesada exitosamente" });
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
        data[evento].push({
          nombre: inv.nombre || "",
          confirmar: inv.confirmar || "",
          lada: inv.lada || "",
          whats: inv.whats || "",
          urlInv: inv.urlInv || "",
          coments: inv.coments || "",
          estatus: inv.estatus || "",
        });
      });

      guardarInvitados(data);

      fs.unlinkSync(archivo.path);

      res.status(200).json({ mensaje: "Lista Excel subida y procesada exitosamente" });

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

  if (!nombre || !confirmar || !lada || !whats || !urlInv || !coments || !estatus) {
    console.log("🤦‍♂️ Tsss te faltaron datos");
    return res.status(400).json({ error: "Faltan datos del invitado" });
  }

  const data = cargarInvitados();

  if (!data[evento]) data[evento] = [];

  data[evento].push({ nombre, confirmar, lada, whats, urlInv, coments, estatus });

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
