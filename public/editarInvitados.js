document.addEventListener("DOMContentLoaded", () => {
  const botonesEditarInvitado = document.querySelectorAll(".btn-editar-invitado");
  const formularioEditarInvitado = document.getElementById("formEditarInvitado");

  // ✅ Al hacer clic en un botón de editar invitado
  botonesEditarInvitado.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Llenamos los campos del modal con los datos del invitado
      document.getElementById("usuarioInvitadoEditar").value = btn.dataset.usuario;
      document.getElementById("editarNombreInvitado").value = btn.dataset.nombre;
      document.getElementById("editarConfirmarPor").value = btn.dataset.confirmar;
      document.getElementById("editarLada").value = btn.dataset.lada;
      document.getElementById("editarCelular").value = btn.dataset.celular;
      document.getElementById("editarUrlInv").value = btn.dataset.url || "";
      document.getElementById("editarComentariosInv").value = btn.dataset.comentarios || "";
    });
  });

  // ✅ Al enviar el formulario de edición
  formularioEditarInvitado.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuarioInvitadoEditar").value;

    try {
      await axios.put(`/api/invitados/${usuario}`, {
        nombre: document.getElementById("editarNombreInvitado").value,
        confirmar: document.getElementById("editarConfirmarPor").value,
        lada: document.getElementById("editarLada").value,
        celular: document.getElementById("editarCelular").value,
        url: document.getElementById("editarUrlInv").value,
        comentarios: document.getElementById("editarComentariosInv").value,
      });

      alert("✅ Invitado actualizado correctamente");
      location.reload(); // Refresca la lista
    } catch (err) {
      console.error("❌ Error al actualizar invitado:", err);
      alert("Error al actualizar el invitado");
    }
  });
});
