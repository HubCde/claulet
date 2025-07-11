import fs from "fs";

let usuarios = {
  admin: { contrasena: "admin123", rol: "admin" },
};

const rutaUsuarios = "usuarios.json";

export const cargarUsuarios = () => {
  if (fs.existsSync(rutaUsuarios)) {
    usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, "utf8"));
  }
};

export const guardarUsuarios = () => {
  fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
};

export const getUsuario = (usuario) => usuarios[usuario];
export const crearUsuario = (usuario, datos) => {
    usuarios[usuario] = datos;
    guardarUsuarios();
};

cargarUsuarios();