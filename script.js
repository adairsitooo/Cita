const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const proposalCard = document.getElementById('proposal-card');
const loveCard = document.getElementById('love-card');
const detailsForm = document.getElementById('details-form');
const btnOpenMaps = document.getElementById('btn-open-maps');

// === 1. LÓGICA DEL BOTÓN "NO" ===
function moverBoton(e) {
    if (e) e.preventDefault();

    if (btnNo.style.position !== 'absolute') {
        btnNo.style.position = 'absolute';
    }

    const padding = 20; 
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

// === 3. ASISTENTE DE GOOGLE MAPS ===
btnOpenMaps.addEventListener('click', () => {
    // Abre Google Maps en una pestaña nueva para que la persona pueda ver o buscar el lugar fácilmente
    window.open('https://www.google.com/maps', '_blank');
});

// === 4. RECOLECTAR DATOS Y ENVIAR MENSAJE MINIMALISTA ===
detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    const tuTelefono = "50248012050"; 

    // Generamos un enlace de búsqueda directa en Google Maps con el sitio que escribieron
    const enlaceGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar)}`;

    // Mensaje ultra-minimalista solicitado
    const mensaje = `¡Cita Confirmada! 🥂\n\n📍 Lugar: ${lugar}\n🗺️ Mapa: ${enlaceGoogleMaps}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}`;
    
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${tuTelefono}&text=${mensajeCodificado}`;

    // Redirección directa sin bloqueos de localhost
    window.location.href = urlWhatsApp;
});
