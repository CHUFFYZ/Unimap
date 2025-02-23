// Esperar a que el DOM esté completamente cargado antes de inicializar el mapa
document.addEventListener('DOMContentLoaded', function() {
    // Dimensiones de la imagen
    var w = 2048,
        h = 1520;
    // Límites de la imagen
    var bounds = [[0, 0], [h, w]];

      // Inicializar el mapa con la vista inicial centrada en [0, 0]
  var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1.5000000000000001,
    maxZoom: 2, // Ajustar el nivel máximo de zoom
    maxBounds: bounds, // Establecer los límites del mapa
    maxBoundsViscosity: 1.0 // Asegurar que no se pueda arrastrar fuera de los límites
  });
  
    // Añadir la imagen al mapa
    var image = L.imageOverlay('image/mapa.jpg', bounds).addTo(map);
  
    // Ajustar la vista del mapa para que encaje con la imagen
    map.fitBounds(bounds);
  
    // Habilitar el zoom y el desplazamiento
    map.scrollWheelZoom.enable();
    map.dragging.enable();
  });
  