<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


$query = "SELECT id, name, (total_amount - available_amount) as sold_amount FROM products LIMIT 30";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();

echo json_encode($result);

?>