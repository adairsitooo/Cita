const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const proposalCard = document.getElementById('proposal-card');
const loveCard = document.getElementById('love-card');
const detailsForm = document.getElementById('details-form');
const btnOpenMaps = document.getElementById('btn-open-maps');

// === 1. LÓGICA DEL BOTÓN "NO" DESBUGEADA ===
function moverBoton(e) {
    if (e) e.preventDefault(); // Detiene cualquier comportamiento raro del celular

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

// Separación limpia de eventos para evitar ejecuciones dobles en iOS/Android
btnNo.addEventListener('touchstart', moverBoton, { passive: false });
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

    const enlaceGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar)}`;

    // NUEVA FRASE ACTUALIZADA: Dedicada a Adairsito
    const mensaje = `Obvio que saldré contigo, como decirle no a Adairsito 🥰\n\n✨ Plan: ${actividad}\n📍 Lugar: ${lugar}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}\n🗺️ Ubicación: ${enlaceGoogleMaps}\n\n💌 Nota para ti: "${mensajePersonal}"`;
    
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${tuTelefono}&text=${mensajeCodificado}`;

    // Enlace invisible infalible para saltarse bloqueos de GitHub Pages / Localhost
    const enlaceInvisible = document.createElement('a');
    enlaceInvisible.href = urlWhatsApp;
    enlaceInvisible.target = '_self'; 
    
    document.body.appendChild(enlaceInvisible);
    enlaceInvisible.click(); 
    document.body.removeChild(enlaceInvisible);
});



