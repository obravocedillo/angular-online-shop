<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
try {
   $conn = new PDO("mysql:host=$servername;dbname=id6200623_onlineshop", $username, $password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        session_start();
        $objetos = array();
        $busqueda = $_POST["busqueda"];




              $sql2 = "SELECT * FROM tienda WHERE nombre LIKE '%{$busqueda}%'";
              $result2 = $conn->query($sql2);


              while ($row2 = $result2->fetch()) {
                  $tempObjetoId;
                  $tempNombre;
                  $tempCantidad;
                  $temPrecio;
                  $tempImagen;
                  $tempSubTotal;


                  $tempObjetoId = $row2["id_objeto"];
                  $tempNombre = $row2["nombre"];
                  $tempCantidad = $row2["cantidad"];
                  $tempImagen = $row2["imagen"];
                  $tempPrecio = $row2["precio"];



                      array_push($objetos,array("id"=>$tempObjetoId,"nombre"=>$tempNombre,
                      "cantidad"=>$tempCantidad,"imagen"=>$tempImagen, "precio"=>$tempPrecio));


              }
              
              $data['success'] = true;
              $data['msg'] = "OK";
              $data['objetos'] = $objetos;
              echo json_encode($data);


}
catch(PDOException $e){

    $data['msg'] = "Error en la connexion {$e}";
    echo json_encode($data);
}

    $conn = null;
?>
