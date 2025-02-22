<?php
header('Content-Type: text/plain');

$databasePath = __DIR__ . '/DB/usuarios.db'; // Ruta correcta a la base de datos

if (!file_exists($databasePath)) {
    error_log('Error: La base de datos no existe en la ruta: ' . $databasePath);
    echo 'error_db_not_found';
    exit;
}

$dsn = 'sqlite:' . $databasePath;

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $matricula = $_POST['matricula'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';

    error_log("Matricula: $matricula, Contraseña: $contrasena");

    $stmt = $pdo->prepare('SELECT * FROM administrativos WHERE matricula = :matricula AND contrasena = :contrasena');
    $stmt->bindParam(':matricula', $matricula);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->execute();

    if ($stmt->fetch()) {
        echo 'success';
        error_log("Respuesta: success");
    } else {
        echo 'failure';
        error_log("Respuesta: failure");
    }
} catch (PDOException $e) {
    echo 'error';
    error_log('Error: ' . $e->getMessage());
}
?>
