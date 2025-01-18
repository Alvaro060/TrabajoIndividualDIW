<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos JSON
$reserva = json_decode($_POST['reserva']);

$sql = "INSERT INTO reservas VALUES (null,$reserva->client_id,'$reserva->check_in_date','$reserva->check_out_date',$reserva->room_number,'$reserva->price');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha insertado la reserva", $conexion);
}
?>
