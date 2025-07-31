# 🎉 Claulet-APP

Aplicación Web Desarrollada con **Node.js**, **Express** y **EJS**, esta app permite registrar eventos, crear vistas dinámicas y almacenar los datos en archivos JSON sin necesidad de base de datos.

---
## 🎢 Estructura de la app
```bash

Claulet/
├── app.js                      
├── server.js                   # Arranca el servidor
├── routes/
│   ├── auth.routes.js
│   ├── eventos.routes.js
│   ├── dashboard.routes.js
│   └── invitados.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── eventos.controller.js
│   ├── dashboard.controller.js
│   └── invitados.controller.js
├── models/
│   ├── usuarios.model.js
│   ├── eventos.model.js
│   └── invitados.model.js
├── middleware/
│   ├── bodyParser.middleware.js
│   ├── static.middleware.js
│   └── upload.middleware.js
├── views/                      
│   ├── login.ejs
│   ├── eventos/
│   │   ├── base.ejs
│   │   └── usuario-evento.ejs (generado)
│   ├── dashboard_admin.ejs
│   ├── dashboard_organizador.ejs
│   ├── dashboard_host.ejs
│   └── scanner.ejs
├── public/
│   ├── assets/...
│   ├── index.html
│   ├── actualizarEvento.js
│   ├── agregarInvitado.js
│   ├── cambiarContrasena.js
│   ├── gestionEventos.js
│   ├── gestionInvitados.js
│   ├── subirListaInvitados.js
│   ├── qrInvitado.js
│   └── main.js
├── temp_uploads/
├── utils/
│   └── token.js
└── usuarios.json
└── eventos.json
└── package-lock.json
└── package.json
└── README.md
```
---
## ⚙️ Tecnologías usadas

- Node.js
- Express.js
- EJS (plantillas del lado del servidor)
- Axios (peticiones desde el cliente)
- Bootstrap (estilos)
- File System (`fs`) para manipular JSON
- xlsx
- multer
- dotenv
- nodemon

---
## funcionalidades realizadas hasta el momento 🐱‍🏍

- login funcionando (admin, host, organizador).
- Creación de eventos desde el administrador al igual que su respectivo usuario.
- Creacion de perfil del organizador desde el administrador (Con datos de su evento).
- Edicion de eventos desde el administrador.
- Edicion de perfil del organizador.
- Eliminacion de eventos, perfil de los organizadores y lista de invitados desde el administrador. 
- Cambio de contraseña desde el perfil administrador.
- Se añade invitado desde el gestor de invitados en admin.
- Se puede filtrar por evento y se crea tabla dinamica con invitados segun el evento.
- Todos los invitados comienzan con estatus pendiente hasta que se confirme su asistencia.
- Se puede importar lista de invitados desde el administrador.
- Se puede editar invitado desde el administrador. 
- Se puede eliminar invitado desde el administrador.
- El invitado cuenta con url, token y Qr, se visualizan desde el administrador.
- Se mantiene token y url del usuario aun que se modifique este.



---

## 🛠️ Instalación

1. Clona el repositorio

```bash
git clone https://github.com/HubCde/claulet
cd claulet
```

2. Instala las dependencias:

```
npm install
```

3. Inicia el servidor.

```
node server.js

```

4. Abre en tu navegador.

```
http://localhost:3000

```
