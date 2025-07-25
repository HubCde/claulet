document.addEventListener("DOMContentLoaded", () => {
  const btnSubirLista = document.getElementById("btnSubirLista");
  const inputSubirLista = document.getElementById("inputSubirLista");

  btnSubirLista.addEventListener("click", () => {
    inputSubirLista.click();
  });

  inputSubirLista.addEventListener("change", async () => {
    const archivo = inputSubirLista.files[0];
    if (!archivo) return;

    const eventoSeleccionado = document.getElementById("selectEventGuests").value;

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("evento", eventoSeleccionado);

    try {
      const res = await axios.post("/api/invitados/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.mensaje);
      window.location.reload();
    } catch (err) {
      console.error("Error al subir archivo:", err);
      alert("Error al subir el archivo");
    }
  });
});

