<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
try {
   $conn = new PDO("mysql:host=$servername;dbname=id6200623_onlineshop", $username, $password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   $username = $_POST["username"];
   $password = $_POST["password"];

   $sql = "SELECT hash FROM users WHERE email='$username'";
   $result = $conn->query($sql);
   $row = $result->fetch(PDO::FETCH_ASSOC);
   $hash = $row["hash"];

   if (password_verify($password, $hash)) {

       $data['success'] = true;
       $data['msg'] = "OK";
       echo json_encode($data);
   } else {
      echo "Contraseña o email invalido";
    }

}
catch(PDOException $e){

    $data['error'] = true;
    $data['msg'] = "Contraseña o email invalidos";
    echo json_encode($data);
}

    $conn = null;
?>
