<?php

require_once('connect_db.php');


$sql = '
    SELECT *
    FROM `leaderboard`
    ORDER BY score ASC
    LIMIT 3
';

$pdoStatement = $pdoDBConnexion->query($sql);
//var_dump($pdoStatement);


$results = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
//var_dump($results);

echo (json_encode($results));
// if GET 
// {
//   $sql = "SELECT * FROM `leaderboard` ORDER BY score ASC LIMIT 10";
//   $res_select = $db_connect->query($sql);
//   $resLine = $res_select->fetchAll();

//   // $resLine représente une ligne de la table de résultats de la requête
//   // C'est un tableau indexé (par les noms ET indices des champs par défaut)

//   $result = "{result: []}"
//   foreach (line : reslines)
//   {
//     $result['result'].add(line.toJSON())
//   }
//   echo $result;

// }
// else if POST
// {
//   $sql = "INSERT score, date FROM leaderboard";
//   $res_select = $db_connect->query($sql);
//   /* $resLine = $res_select->fetch(); */

// }