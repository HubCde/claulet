const modalQR = document.getElementById("modalQrInvitado");
const qrContainer = document.getElementById("qrContainer");
const nombreInvitadoQR = document.getElementById("nombreInvitadoQR");

// QRCode.js carga desde CDN nuestro archivo dashboard_admin.ejs

modalQR.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  const nombre = button.getAttribute('data-nombre');
  const link = button.getAttribute('data-link');
  const token = button.getAttribute('data-token');

  nombreInvitadoQR.innerHTML = `
    <strong>${nombre}</strong><br>
    <small>Token: ${token}</small><br>
    <small>Link: <a href="${link}" target="_blank">${link}</a></small>
  `;

  qrContainer.innerHTML = "";

  QRCode.toCanvas(link, { width: 200 }, (error, canvas) => {
    if (error) {
      console.error(error);
      qrContainer.innerText = "Error generando QR";
      return;
    }
    qrContainer.appendChild(canvas);
  });
});

function copiarLink() {
  const input = document.getElementById("linkInvitado");
  input.select();
  input.setSelectionRange(0, 99999); // Para móviles
  document.execCommand("copy");
  alert("¡Link copiado al portapapeles!");
}