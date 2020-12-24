

<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


session_start();

$data = json_decode(file_get_contents("php://input"));

$query = "INSERT INTO sold_products (p_id, total_price, quantity, buying_price) VALUES ( ?, ?, ?, ?)";
$statement = $connect->prepare($query);
$statement->execute([$data->id,  $data->total_price, $data->amount, $data->buying_price]);

echo json_encode('success'); 

?>