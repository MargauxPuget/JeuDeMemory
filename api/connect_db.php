<?php
// permet de se connecter à la base de donnée

require_once('config.php');

try {
  $pdoDBConnexion = new PDO(
      $dataSourceName,
      $user,
      $password,
      $option
  );
} catch(PDOException $exception) {
  echo "Connexion échouée : " . $exception->getMessage();
}
