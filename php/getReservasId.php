<?php
require_once('config.php');
$conexion = obtenerConexion();

$reservation_id = $_GET['reservation_id'];

// SQL para recuperar los clientes con el id proporcionado
$sql = "SELECT *
        FROM reservas 
        WHERE reservation_id = '$reservation_id'";

$resultado = mysqli_query($conexion, $sql);

// Inicialización del array vacío
$datos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);
