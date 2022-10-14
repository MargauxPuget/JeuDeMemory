<?php

require_once('connect_db.php');

$isGet= $_SERVER['REQUEST_METHOD'] === 'GET';
$isPost= $_SERVER['REQUEST_METHOD'] === 'POST';

if ($isGet)
  {
  $sql = '
      SELECT *
      FROM `leaderboard`
      ORDER BY score ASC
      LIMIT 3
  ';
  $pdoStatement = $pdoDBConnexion->query($sql);
  $results = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
  echo (json_encode($results));
}
else if ($isPost)
{
  $score = $_POST["score"];

  $sql = "INSERT INTO leaderboard (score) VALUES (?)";
  $pdoDBConnexion->prepare($sql)->execute([$score]);

}