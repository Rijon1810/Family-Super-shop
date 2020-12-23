<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


$query = "SELECT DISTINCT(DATE(date)) as date FROM sold_products";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();

echo json_encode($result);

?>