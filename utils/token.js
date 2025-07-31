// utils/token.js
import crypto from 'crypto';
import { URLSearchParams } from 'url';

const SECRET_KEY = "fiesta_regina";

export function generarToken(invitado, pases) {
  const mensaje = `${invitado}:${pases}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(mensaje);
  const digest = hmac.digest();
  const token = digest.toString('base64url').substring(0, 10);
  return token;
}

export function generarLink(invitado, token) {
  const params = new URLSearchParams({
    Invitado: invitado,
    token
  });
  return `/index.html?${params.toString()}`;
}
