import { cargarInvitados, guardarInvitados } from "../models/invitados.models.js";

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

