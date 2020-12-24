<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


$query = "SELECT id, name, Date(date_of_update) as date_of_update  FROM products LIMIT 30";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();

echo json_encode($result);

?>