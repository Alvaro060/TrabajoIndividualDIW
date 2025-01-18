<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$reservation_id = $_POST['reservation_id'];

// SQL
$sql = "DELETE FROM reservas WHERE reservation_id = $reservation_id;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

