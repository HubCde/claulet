import app from './app.js'

const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log("Servidor de claudet corriendo en http://localhost:3000");
  console.log("Servidor de admin corriendo en http://localhost:3000/admin");
  console.log("Servidor de host corriendo en http://localhost:3000/host");
  console.log(
    "Servidor de organizador corriendo en http://localhost:3000/organizador"
  );
  console.log("Servidor de login corriendo en http://localhost:3000/login");
  console.log("Servidor de scanner corriendo en http://localhost:3000/scanner");
});