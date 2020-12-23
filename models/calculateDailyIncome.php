<?php

include('../config/db-connection.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

$query = "SELECT SUM(quantity) as quantity, SUM(total_price) as total_price FROM sold_products WHERE DATE(date) = ?";
$statement = $connect->prepare($query);
$statement->execute([$data->date]);
$result = $statement->fetchAll();

echo json_encode($result);

?>