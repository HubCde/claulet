# 🎉 Claulet-APP

Aplicación Web Desarrollada con **Node.js**, **Express** y **EJS**, esta app permite registrar eventos, crear vistas dinámicas y almacenar los datos en archivos JSON sin necesidad de base de datos.

---
## 🎢 Estructura de la app

Claulet/
├── app.js                      # Configura middlewares y rutas
├── server.js                   # Arranca el servidor
├── routes/
│   ├── auth.routes.js
│   ├── eventos.routes.js
│   └── dashboard.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── eventos.controller.js
│   └── dashboard.controller.js
├── models/
│   ├── usuarios.model.js
│   └── eventos.model.js
├── middleware/
│   ├── bodyParser.middleware.js
│   └── static.middleware.js
├── views/                      # Tus EJS siguen aquí (login, eventos, dashboards)
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
│   └── main.js
└── usuarios.json
└── eventos.json
└── package-lock.json
└── package.json
└── README.md
---
## ⚙️ Tecnologías usadas

- Node.js
- Express.js
- EJS (plantillas del lado del servidor)
- Axios (peticiones desde el cliente)
- Bootstrap (estilos)
- File System (`fs`) para manipular JSON

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
