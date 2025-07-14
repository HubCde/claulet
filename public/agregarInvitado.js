document.addEventListener("DOMContentLoaded", () => {
  const selectEvento = document.getElementById("selectEventGuests");
  const inputEvento = document.getElementById("eventoSeleccionadoInput");
  const form = document.getElementById("formAgregarInvitado");

  // Actualizar el hidden cuando cambie el evento seleccionado
  selectEvento.addEventListener("change", () => {
    inputEvento.value = selectEvento.value;
  });

  // Inicializa con el valor actual
  inputEvento.value = selectEvento.value;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const evento = inputEvento.value;
    const nombre = document.getElementById("nombreInvitado").value;
    const correo = document.getElementById("correoInvitado").value;

    try {
      const res = await axios.post(`/api/invitados/${evento}`, {
        nombre,
        correo,
        estatus: "Pendiente"
      });

      alert("✅ Invitado agregado correctamente");
      form.reset();
      document.getElementById("modalAgregarInvitado").classList.remove("show");
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-backdrop").remove();
      // ✅ ACTUALIZAR LA PÁGINA
      window.location.reload(); // <- Aquí recargas para ver la tabla actualizada
    } catch (err) {
      console.error("❌ Error al guardar invitado:", err);
      alert("Error al guardar el invitado");
    }
  });
});
