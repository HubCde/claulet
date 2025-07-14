document.addEventListener("DOMContentLoaded", () => {
  const botonesContrasena = document.querySelectorAll(".btn-contrasena");
  const modal = new bootstrap.Modal(document.getElementById("passwordModal"));

  botonesContrasena.forEach((btn) => {
    btn.addEventListener("click", () => {
      const usuario = btn.dataset.usuario;
      document.getElementById("usuarioParaContrasena").value = usuario;
    });
  });

  const form = document.getElementById("formCambiarContrasena");
  const guardarBtn = document.querySelector("#passwordModal .btn-primary");

  guardarBtn.addEventListener("click", async () => {
    const usuario = document.getElementById("usuarioParaContrasena").value;
    const organizador = document.getElementById("organizerPass").value;
    // const scanner = document.getElementById("scannerPass").value;

    try {
      const res = await axios.put(`/api/usuarios/${usuario}/contrasenas`, {
        contrasena_organizador: organizador
      });

      alert(res.data.mensaje);
      modal.hide();
    } catch (err) {
      console.error("❌ Error al guardar contraseñas:", err.response?.data || err.message);
      alert("Error al guardar las contraseñas");
    }
  });
});
