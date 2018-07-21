<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");

try {
   $conn = new PDO("mysql:host=$servername;dbname=id6200623_onlineshop", $username, $password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   define('id', 'id');

        session_start();
        $email =  $_POST["username"];
        $datos =$_POST["objetos"];
        $objetos = array();




        foreach($datos as $dato) {

            $tempId;
            $tempCantidad;

            $tempCantidadTienda;

            $tempId = json_encode($dato["id"]);
            $tempCantidad = json_encode($dato["cantidad"]);



            $sql5 = "SELECT cantidad FROM basket WHERE producto_id=$tempId";
            $result5 = $conn->query($sql5);
            $row5 = $result5->fetch(PDO::FETCH_ASSOC);
            $tempCantidadBasket = $row5["cantidad"];

            $sql6 = "SELECT cantidad FROM tienda WHERE id_objeto=$tempId";
            $result6 = $conn->query($sql6);
            $row6 = $result6->fetch(PDO::FETCH_ASSOC);
            $tempCantidadTienda = $row6["cantidad"];

            $cantidadTotal = $tempCantidadTienda-$tempCantidadBasket;

            $sql4 = "UPDATE tienda SET cantidad=$cantidadTotal  WHERE id_objeto=$tempId";
            $result4 = $conn->query($sql4);



            array_push($objetos,array("id"=>$tempId,"cantidad"=>$tempCantidad, "cantidadTotal"=>$cantidadTotal));


        }


          $sql = "SELECT user_id FROM users WHERE email='$email'";

          $result = $conn->query($sql);
          $row = $result->fetch(PDO::FETCH_ASSOC);
          $id2 = $row["user_id"];


          $sql3 = "SELECT * FROM basket WHERE user_id='$id2'";
          $result3 = $conn->query($sql3);



          while ($row3 = $result3->fetch()) {
              $tempObjetoId;
              $tempNombre;
              $tempCantidad;
              $temPrecio;
              $tempImagen;
              $tempSubTotal;


              $tempObjetoId = $row3["producto_id"];
              $tempNombre = $row3["producto"];
              $tempCantidad = $row3["cantidad"];
              $tempImagen = $row3["imagen"];
              $tempPrecio = $row3["precio"];
              $tempSubTotal = $row3["subtotal"];





          }

          $sql2 = "DELETE FROM basket WHERE user_id='$id2'";
          $result2 = $conn->query($sql2);







          error_reporting(0);
          $data['success'] = true;
          $data['objetos'] = $objetos;
          $data['msg'] = "OK";

          echo json_encode($data);



}

catch(PDOException $e){

    $data['msg'] = "Error en la connexion {$e}";
    echo json_encode($data);
}

    $conn = null;
?>
