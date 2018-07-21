<?php
require('conn.php');

try {
   $conn = new PDO("mysql:host=$servername;dbname=id6200623_onlineshop", $username, $password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  /* $username = $_POST["username"];
   $passwors = $_POST["password"];
   echo "Exito en la conexion {$username} {$password}";
   */

   $hashed_password = password_hash("yisus123", PASSWORD_DEFAULT);
   $hashed_password2 = password_hash("naomi123", PASSWORD_DEFAULT);
   $hashed_password3 = password_hash("alejandro123", PASSWORD_DEFAULT);

 $sql = "INSERT INTO users (email, nombre,Hash)
  VALUES ('yisus@gmail.com', 'yisus Salvador Cedillo', '{$hashed_password}'),
  ('naomi@gmail.com', 'Naomi Jimenez Rosales', '{$hashed_password2}'),
  ('alejandro@gmail.com', 'Alejandro Perez Montoya', '{$hashed_password3}')";

  $conn->exec($sql);

  echo "New records created successfully";

}
catch(PDOException $e){
    echo("error en la coneccion");
}

    $conn = null;
?>
