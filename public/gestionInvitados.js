document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("selectEventGuests");
  const tbody = document.querySelector("#guests-tab tbody");

  async function cargarInvitados(evento) {
    try {
      const res = await axios.get(`/api/invitados/${evento}`);
      const invitados = res.data;

      tbody.innerHTML = "";

      if (invitados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Sin invitados</td></tr>`;
        return;
      }

      invitados.forEach(inv => {
        tbody.insertAdjacentHTML("beforeend", `
          <tr>
            <td>${inv.nombre}</td>
            <td>${inv.lada} ${inv.whats}</td>
            <td>${inv.estatus}</td>
            <td><button class="btn btn-sm btn-outline-info"><i class="fas fa-qrcode"></i></button></td>
            <td>
              <button class="btn btn-sm btn-outline-secondary me-1"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        `);
      });
        
    } catch (err) {
      console.error("❌ Error al obtener invitados:", err);
      tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error al cargar invitados</td></tr>`;
    }
  }

  // Al iniciar
  if (select.value) cargarInvitados(select.value);

  // Al cambiar evento
  select.addEventListener("change", () => {
    cargarInvitados(select.value);
  });
});
