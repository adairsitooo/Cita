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
    window.open('https://www.google.com/maps', '_blank');
});

// === 4. RECOLECTAR DATOS Y ENVIAR AL WHATSAPP ===
detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const mensajePersonal = document.getElementById('mensaje-personal').value;

    const tuTelefono = "50248012050"; 

    // CORREGIDO: Enlace oficial de búsqueda en Google Maps con formato correcto
    const enlaceGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar)}`;

    // NUEVO MENSAJE: Más tierno, elaborado pero limpio y estructurado (minimalista)
    const mensaje = `¡Siií, acepto! 🤭 Me encantaría que saliéramos. Esto es lo que pensé para nuestro día:\n\n✨ Plan: ${actividad}\n📍 Lugar: ${lugar}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}\n🗺️ Ubicación: ${enlaceGoogleMaps}\n\n💌 Nota para ti: "${mensajePersonal}"`;
    
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Cambiado al formato universal corto 'wa.me' que evita fallos en navegadores locales
    const urlWhatsApp = `https://wa.me/${tuTelefono}?text=${mensajeCodificado}`;

    // Redirección instantánea
    window.location.href = urlWhatsApp;
});


