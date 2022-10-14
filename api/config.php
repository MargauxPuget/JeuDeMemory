<?php
$dataSourceName = 'mysql:dbname=memory;host=localhost;charset=UTF8';
$user = "memory";
$password = "memory";
$option = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING
  // Pour les tests, PDO::ERRMODE_WARNING permet d'avoir des indices sur les
  // erreurs qui se produisent lors de l'utilisation de la connexion PDO
  // et notamment pour l'exécution des requêtes.
  // En production, on aurait mis : PDO::ERRMODE_SILENT car on ne veut pas 
  // donner accès à tout le monde aux informations disponibles dans les
  // messages d'erreurs d'accès à la BDD
  // => pour éviter les risques de sécurité
];