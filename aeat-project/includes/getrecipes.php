<?php

  require_once 'database.php';

  $query_result = isset($_GET["q"]) ? $_GET["q"] : null;

  $query = "SELECT id ";
  $query .= "FROM recipes ";
  $query .= "WHERE filters LIKE '%{$query_result}%'";

  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Database query failed.');
  }

  $id_array = array();

  while ($curID = mysqli_fetch_assoc($result)) {
    array_push($id_array, intval($curID['id']));
  }

  echo json_encode($id_array);

?>
