document.addEventListener("DOMContentLoaded", () => {
  const botonesEditar = document.querySelectorAll(".btn-editar");
  const formulario = document.getElementById("formEditarEvento");

  // ✅ Al hacer clic en un botón de editar
  botonesEditar.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Llenamos los campos del modal con los datos del botón
      document.getElementById("editEventUsuario").value = btn.dataset.usuario;
      document.getElementById("editEventName").value = btn.dataset.titulo;
      document.getElementById("editEventDate").value = btn.dataset.fecha;
      document.getElementById("editEventTime").value = btn.dataset.hora;
      document.getElementById("editEventLocation").value = btn.dataset.lugar;
      document.getElementById("editInvitationMessage").value = btn.dataset.descripcion;
    });
  });

  // ✅ Al enviar el formulario
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("editEventUsuario").value;

    try {
      await axios.put(`/api/eventos/${usuario}`, {
        titulo: document.getElementById("editEventName").value,
        fecha: document.getElementById("editEventDate").value,
        hora: document.getElementById("editEventTime").value,
        lugar: document.getElementById("editEventLocation").value,
        descripcion: document.getElementById("editInvitationMessage").value,
      });

      alert("✅ Evento actualizado correctamente");
      location.reload(); // Refresca la tabla
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      alert("Error al actualizar el evento");
    }
  });
});

