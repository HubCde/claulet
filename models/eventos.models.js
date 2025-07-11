import fs from "fs";

const rutaEventos = "eventos.json";

export const cargarEventos = () => {
  if (fs.existsSync(rutaEventos)) {
    const contenido = fs.readFileSync(rutaEventos, "utf8");
    return contenido ? JSON.parse(contenido) : [];
  }
  return [];
};

export const guardarEventos = (eventos) => {
  fs.writeFileSync(rutaEventos, JSON.stringify(eventos, null, 2));
};