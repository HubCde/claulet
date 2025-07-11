import { getUsuario } from "../models/usuarios.models.js";

export const mostrarLogin = (req, res) => {
    res.render('login.ejs');
};

export const procesarLogin = (req, res) => {
    const { usuario, contrasena } = req.body;
    const user = getUsuario(usuario);

    if (user && user.contrasena === contrasena) {
        const ruta = user.rol === "admin" ? "/admin" : `/eventos/${usuario}`;
        return res.json({ redireccion: ruta });
    }

    res.status(401).json({ error: "Credenciales inválidas" });
};