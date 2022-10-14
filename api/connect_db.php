<?php

require_once('config.php');

try {
  $pdoDBConnexion = new PDO(
      $dataSourceName,
      $user,
      $password,
      $option
  );
  //var_dump($pdoDBConnexion);
} catch(PDOException $exception) {
  echo "Connexion échouée : " . $exception->getMessage();
}

// try {
//   $db_connect = new PDO("mysql:host=" . $host . ";dbname=" . $dbname, $user, $pass);
// }
// catch (PDOException $e) {
//     die("Erreur en se connectant à la BD: " . $e->getMessage());
// }