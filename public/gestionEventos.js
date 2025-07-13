document.addEventListener("DOMContentLoaded", () => {
  // Eliminar evento
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const usuario = btn.closest("tr").dataset.usuario;
      const confirmar = confirm(`¿Estás seguro de eliminar el evento ${usuario}?`);

      if (!confirmar) return;

      try {
        const res = await axios.delete(`/api/eventos/${usuario}`);
        alert(res.data.mensaje);
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar el evento");
      }
    });
  });
    
    //Editar evento

    document.querySelectorAll(".btn-editar").forEach((btn => {
        btn.addEventListener("click", async (e) => {
            const usuario = btn.closest("tr").dataset.usuario;
            console.log("Abrir formulario para editar evento de:", usuario)
            // queda pendiente logica
        })
    }));

    //Editar contraseña

    document.querySelectorAll(".btn-contrasena").forEach((btn => {
        btn.addEventListener("click", async (e) => {
            const usuario = btn.closest("tr").dataset.usuario;
            console.log("Abrir formulario para editar evento de:", usuario)
            // queda pendiente logica
        })
    }));
});
