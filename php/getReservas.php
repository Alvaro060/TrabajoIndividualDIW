<?php
require_once('config.php');
$conexion = obtenerConexion();

// SQL para recuperar las reservas 
$sql = "SELECT * FROM reservas;";

$resultado = mysqli_query($conexion, $sql);

// Inicialización del array vacío
$datos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);
