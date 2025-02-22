const mapContainer = document.getElementById('containermap');
const map = document.getElementById('mapa');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

let scale = 0.5;
const zoomFactor = 0.1;
const minScale = 0.5;  // Escala mínima
const maxScale = 3;  // Escala máxima
const zoomSpeed = 50;  // Velocidad del zoom en milisegundos
let isDragging = false;
let startX, startY, initialX, initialY;
let zoomInInterval, zoomOutInterval;

function clearZoomIntervals() {
    clearInterval(zoomInInterval);
    clearInterval(zoomOutInterval);
}

function zoomIn() {
    zoomInInterval = setInterval(() => {
        scale = Math.min(maxScale, scale + zoomFactor);
        map.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }, zoomSpeed);
}

function zoomOut() {
    zoomOutInterval = setInterval(() => {
        scale = Math.max(minScale, scale - zoomFactor);
        map.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }, zoomSpeed);
}

zoomInBtn.addEventListener('mousedown', zoomIn);
zoomInBtn.addEventListener('mouseup', clearZoomIntervals);
zoomInBtn.addEventListener('mouseleave', clearZoomIntervals);
zoomInBtn.addEventListener('touchstart', zoomIn);
zoomInBtn.addEventListener('touchend', clearZoomIntervals);

zoomOutBtn.addEventListener('mousedown', zoomOut);
zoomOutBtn.addEventListener('mouseup', clearZoomIntervals);
zoomOutBtn.addEventListener('mouseleave', clearZoomIntervals);
zoomOutBtn.addEventListener('touchstart', zoomOut);
zoomOutBtn.addEventListener('touchend', clearZoomIntervals);

map.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY < 0) {
        scale = Math.min(maxScale, scale + zoomFactor);
    } else {
        scale = Math.max(minScale, scale - zoomFactor);
    }
    map.style.transform = `translate(-50%, -50%) scale(${scale})`;
});

mapContainer.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Botón izquierdo del ratón
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialX = map.offsetLeft;
        initialY = map.offsetTop;
        event.preventDefault();
        mapContainer.style.cursor = "grabbing"; // Cambiar el cursor al arrastrar
    }
});

mapContainer.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        map.style.left = `${initialX + dx}px`;
        map.style.top = `${initialY + dy}px`;
    }
});

mapContainer.addEventListener('mouseup', () => {
    isDragging = false;
    mapContainer.style.cursor = "grab"; // Restablecer el cursor al soltar
});

mapContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    mapContainer.style.cursor = "grab"; // Restablecer el cursor al dejar el área
});

// Prevenir menú contextual en todo el contenedor del mapa
mapContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Soporte para gestos táctiles (zoom y arrastre)
let initialDistance = null;
let touchStartX, touchStartY;

function handleTouchMove(event) {
    if (event.touches.length === 2) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

        if (initialDistance === null) {
            initialDistance = currentDistance;
        } else {
            const distanceDelta = currentDistance - initialDistance;
            const zoomScale = 1 + distanceDelta / 200; // Ajusta este valor según necesites
            scale = Math.min(maxScale, Math.max(minScale, scale * zoomScale));
            map.style.transform = `translate(-50%, -50%) scale(${scale})`;
            initialDistance = currentDistance;
        }
    } else if (event.touches.length === 1 && isDragging) {
        event.preventDefault();
        const touch = event.touches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        map.style.left = `${initialX + dx}px`;
        map.style.top = `${initialY + dy}px`;
    }
}

mapContainer.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
        isDragging = true;
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        initialX = map.offsetLeft;
        initialY = map.offsetTop;
    }
});

mapContainer.addEventListener('touchmove', handleTouchMove);

mapContainer.addEventListener('touchend', () => {
    initialDistance = null;
    isDragging = false;
});


/*------------------------------------------------------------------------------
// Obtener la referencia de la imagen del mapa
const map = document.querySelector('#mapa img');
let scale = 1; // Escala inicial
let isDragging = false; // Bandera para saber si se está arrastrando
let startX, startY; // Posiciones iniciales del ratón
let translateX = 0, translateY = 0; // Posiciones de la traducción
let originX = 0.5, originY = 0.5; // Origen del zoom

// Función para manejar el evento de desplazamiento del ratón (scroll wheel)
map.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll

    const rect = map.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;

    // Calcular la nueva escala
    const deltaScale = event.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, scale + deltaScale), 3);

    // Ajustar la posición de la imagen en base al zoom
    const adjustX = (offsetX - originX) * map.width;
    const adjustY = (offsetY - originY) * map.height;

    translateX -= adjustX * deltaScale;
    translateY -= adjustY * deltaScale;

    // Aplicar la nueva escala y transformación
    scale = newScale;
    originX = offsetX;
    originY = offsetY;

    map.style.transformOrigin = `${originX * 100}% ${originY * 100}%`;
    map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// Función para manejar el inicio del arrastre
map.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX - translateX;
    startY = event.clientY - translateY;
});

// Función para manejar el fin del arrastre
map.addEventListener('mouseup', () => {
    isDragging = false;
});

// Función para manejar el movimiento del ratón mientras se arrastra
map.addEventListener('mousemove', (event) => {
    if (isDragging) {
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
});

// Detener el arrastre cuando se suelta el botón del ratón fuera de la imagen
map.addEventListener('mouseleave', () => {
    isDragging = false;
});
--------------------------------------------------------------------------------------------*/
