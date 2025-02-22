
function acceder() {
    var matricula = document.getElementById('matricula').value;
    var contrasena = document.getElementById('contraseña').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'verificarsesion.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Depuración: muestra la respuesta completa del servidor
            if (xhr.responseText.trim() === 'success') {
                window.location.href = 'html/mapaALUM.html';
            } else {
                alert('Matrícula o contraseña incorrecta');
            }
        } else {
            console.error('Error al conectar con el servidor');
        }
    };
    xhr.send('matricula=' + encodeURIComponent(matricula) + '&contrasena=' + encodeURIComponent(contrasena));
}

function acceder2() {
    var matricula = document.getElementById('matricula').value;
    var contrasena = document.getElementById('contraseña').value;
    var mensajeError = document.getElementById('mensajeError');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../verificarsesion2.php', true); // Cambiar la ruta aquí para acceder a la carpeta raíz
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Depuración: muestra la respuesta completa del servidor
            if (xhr.responseText.trim() === 'success') {
                window.location.href = 'mapaADMIN.html';
            } else if (xhr.responseText.trim() === 'failure') {
                mensajeError.textContent = 'Matrícula o contraseña incorrecta';
            } else if (xhr.responseText.trim() === 'error') {
                mensajeError.textContent = 'Error al procesar la solicitud';
            }
        } else {
            console.error('Error al conectar con el servidor');
            mensajeError.textContent = 'Error al conectar con el servidor';
        }
    };
    xhr.send('matricula=' + encodeURIComponent(matricula) + '&contrasena=' + encodeURIComponent(contrasena));
}
