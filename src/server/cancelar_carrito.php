<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");

try {
   $conn = new PDO("mysql:host=$servername;dbname=id6200623_onlineshop", $username, $password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        session_start();
        $email =  $_POST["username"];


          $sql = "SELECT user_id FROM users WHERE email='$email'";

          $result = $conn->query($sql);
          $row = $result->fetch(PDO::FETCH_ASSOC);
          $id = $row["user_id"];




        $sql2 = "DELETE FROM basket WHERE user_id='$id'";
        $result2 = $conn->query($sql2);






        $data['success'] = true;
        $data['msg'] = "OK";

        echo json_encode($data);


}

catch(PDOException $e){

    $data['msg'] = "Error en la connexion {$e}";
    echo json_encode($data);
}

    $conn = null;
?>
