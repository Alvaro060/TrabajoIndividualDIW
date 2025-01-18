<?php

include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos JSON
$cliente = json_decode($_POST['cliente']);

$sql = "INSERT INTO clientes VALUES (null,'$cliente->client_name','$cliente->address',$cliente->phone_number,'$cliente->email');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha insertado el cliente", $conexion);
}
?>
