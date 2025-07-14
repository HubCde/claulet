import fs from 'fs';

const ruta = 'invitados.json';

export function cargarInvitados() {
  if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, '{}');
  return JSON.parse(fs.readFileSync(ruta, 'utf8'));
}

export function guardarInvitados(data) {
  fs.writeFileSync(ruta, JSON.stringify(data, null, 2));
}
