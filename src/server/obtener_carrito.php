<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
try {
   $conn = new PDO("mysql:host=$servername;dbname=id6200623_onlineshop", $username, $password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        session_start();
        $email =  $_POST["username"];
        $objetos = array();


          $sql = "SELECT user_id FROM users WHERE email='$email'";

          $result = $conn->query($sql);
          $row = $result->fetch(PDO::FETCH_ASSOC);
          $id = $row["user_id"];


              $sql2 = "SELECT * FROM basket WHERE user_id='$id'";
              $result2 = $conn->query($sql2);


              while ($row2 = $result2->fetch()) {
                  $tempObjetoId;
                  $tempNombre;
                  $tempCantidad;
                  $temPrecio;
                  $tempImagen;
                  $tempSubTotal;


                  $tempObjetoId = $row2["producto_id"];
                  $tempNombre = $row2["producto"];
                  $tempCantidad = $row2["cantidad"];
                  $tempImagen = $row2["imagen"];
                  $tempPrecio = $row2["precio"];
                  $tempSubTotal = $row2["subtotal"];

                      
                      array_push($objetos,array("id"=>$tempObjetoId,"nombre"=>$tempNombre,
                      "cantidad"=>$tempCantidad,"imagen"=>$tempImagen, "precio"=>$tempPrecio, "subtotal"=>$tempSubTotal));


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
