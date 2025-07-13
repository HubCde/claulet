document.addEventListener("DOMContentLoaded", () => {

  // login

  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const datos = Object.fromEntries(formData.entries());

      try {
        const res = await axios.post("/api/login", datos);
        window.location.href = res.data.redireccion; // redirige según el backend
      } catch (err) {
        alert("Credenciales incorrectas :'(");
      }
    });
  }

  // Obtener datos del formulario crear evento

  //Seleccionamos el id de nuestro formulario y la guardamos en la variable formEvento
  const formEvento = document.querySelector("#form-evento");

  if (formEvento) {
    formEvento.addEventListener("submit", async (e) => {
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(formEvento).entries());

      try {
        const res = await axios.post("/api/eventos", datos);
        alert("Evento creado");
        window.location.href = "/admin";
      } catch (err) {
        console.error("Error al crear evento", err.response?.data || err);
        alert("Error al crear evento");
      }
    });
  }
});
