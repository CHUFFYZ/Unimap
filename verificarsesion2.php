<?php
$dsn = 'sqlite:./DB/usuarios.db'; // Ruta a tu base de datos
try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $matricula = $_POST['matricula'];
    $contrasena = $_POST['contrasena'];

    // Mensajes de depuración
    error_log("Matricula: $matricula, Contraseña: $contrasena");

    $stmt = $pdo->prepare('SELECT * FROM administrativos WHERE matricula = :matricula AND contrasena = :contrasena');
    $stmt->bindParam(':matricula', $matricula);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->execute();

    if ($stmt->fetch()) {
        echo 'success';
    } else {
        echo 'failure';
    }
} catch (PDOException $e) {
    echo 'error'; // Simplemente envía 'error' en caso de excepción
    error_log('Error: ' . $e->getMessage()); // Mensaje de error en el registro
}
?>
