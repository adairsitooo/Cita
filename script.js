const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const proposalCard = document.getElementById('proposal-card');
const loveCard = document.getElementById('love-card');
const detailsForm = document.getElementById('details-form');

// === 1. LÓGICA PARA ESCAPAR DEL BOTÓN "NO" ===
function moverBoton(e) {
    if (e) e.preventDefault();

    if (btnNo.style.position !== 'absolute') {
        btnNo.style.position = 'absolute';
    }

    const padding = 25; 
    const maxX = window.innerWidth - btnNo.offsetWidth - padding;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding;

    const limiteX = maxX > padding ? maxX : window.innerWidth - padding;
    const limiteY = maxY > padding ? maxY : window.innerHeight - padding;

    const randomX = Math.floor(Math.random() * (limiteX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (limiteY - padding)) + padding;

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('touchstart', moverBoton);
btnNo.addEventListener('pointerdown', moverBoton);
btnNo.addEventListener('mouseover', moverBoton);

// === 2. ACCIÓN CUANDO DICE SÍ ===
btnYes.addEventListener('click', () => {
    proposalCard.classList.add('hidden');
    loveCard.classList.remove('hidden');
    btnNo.style.display = 'none'; 
});

// === 3. RECOLECTAR DATOS Y ENVIAR CON UN MENSAJE ===
detailsForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // Capturar las respuestas ingresadas
    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    // Tu número de teléfono configurado correctamente
    const tuTelefono = "50248012050"; 

    // Estructurar el mensaje bonito
    const mensaje = `¡Hola! 💘 Acepto salir contigo. Aquí están los detalles para nuestra cita:\n\n📍 Lugar: ${lugar}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}`;
    
    // Codificar el texto para que el navegador lo entienda en una URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Crear el enlace directo a tu chat de WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${tuTelefono}&text=${mensajeCodificado}`;

    // SOLUCIÓN: Redirige la pestaña actual para saltarse el bloqueo de pop-ups en localhost
    window.location.href = urlWhatsApp;
});
