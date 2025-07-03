import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Renderiza la vista del dash board inicial. (tener cuidado)
app.get("/admin", (req, res) => {
  res.render("index.ejs");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log("Servidor de claudet corriendo en http://localhost:3000");
});
