// Pide confirmación antes de enviar formularios con data-confirm (p. ej. eliminar un producto)
document.addEventListener('submit', (event) => {
  const form = event.target;
  const message = form.dataset.confirm;

  if (message && !window.confirm(message)) {
    event.preventDefault();
  }
});
