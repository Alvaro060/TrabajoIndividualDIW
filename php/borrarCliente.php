<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$client_id = $_POST['client_id'];

// SQL
$sql = "DELETE FROM clientes WHERE client_id = $client_id;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

