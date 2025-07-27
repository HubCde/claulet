document.addEventListener("DOMContentLoaded", () => {

  // ✅ Al hacer clic en un botón de editar invitado
  document.addEventListener("click", (e) => {
    if (e.target.closest(".editar-invitado")) {
      const btn = e.target.closest(".editar-invitado");

      document.getElementById("inputEventIv").value = btn.dataset.evento;
      document.getElementById("editNombreIv").value = btn.dataset.nombre;
      document.getElementById("editConfirmar").value = btn.dataset.confirmar;
      document.getElementById("editLadaIv").value = btn.dataset.lada;
      document.getElementById("editWhatsIv").value = btn.dataset.whats;
      document.getElementById("editURLIv").value = btn.dataset.urlinv;
      document.getElementById("editComentsIv").value = btn.dataset.coments;
      document.getElementById("editEstatusIv").value = btn.dataset.estatus;
    }
  });

  // ✅ Al enviar el formulario de edición
  const formEditar = document.getElementById("formEditarInvitado");

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const evento = document.getElementById("inputEventIv").value;
    const nombre = document.getElementById("editNombreIv").value;
    const confirmar = document.getElementById("editConfirmar").value;
    const lada = document.getElementById("editLadaIv").value;
    const whats = document.getElementById("editWhatsIv").value;
    const urlInv = document.getElementById("editURLIv").value;
    const coments = document.getElementById("editComentsIv").value;
    const estatus = document.getElementById("editEstatusIv").value;

    try {
      await axios.put(`/api/invitados/${evento}`, {
        evento,
        nombre,
        confirmar,
        lada,
        whats,
        urlInv,
        coments,
        estatus,
      });

      alert("✅ Invitado actualizado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error al actualizar invitado:", error);
      alert("Error al actualizar el invitado");
    }
  });

  // ✅ Al eliminar un invitado
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".btn-eliminar-inv");
  if (!btn) return;

  const evento = btn.dataset.evento;
  const nombre = btn.dataset.nombre;
  const whats = btn.dataset.whats;

  const confirmar = confirm(`¿Estás seguro de eliminar al invitado ${nombre} del evento ${evento} con whatsapp ${whats}?`);
  if (!confirmar) return;

  try {
    console.log(`🧹 Enviando petición DELETE a: /api/invitados/${evento}/${whats}`);
    const res = await axios.delete(`/api/invitados/${evento}/${whats}`);
    alert(res.data.mensaje);
    window.location.reload();
  } catch (err) {
    console.error("❌ Error al eliminar:", err);
    alert("Error al eliminar al invitado");
  }
});

});
