<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$reserva = json_decode($_POST['reserva']);

$sql = "UPDATE reservas
SET client_id = '" . $reserva->client_id . "', 
check_in_date = '" .  $reserva->check_in_date . "', 
check_out_date = '" .  $reserva->check_out_date . "',
room_number = '" .  $reserva->room_number . "', 
price = '" .  $reserva->price . "'
WHERE reservation_id = $reserva->reservation_id ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado la reserva", $conexion);
}
?>
