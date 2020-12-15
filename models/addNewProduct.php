

<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


session_start();

$data = json_decode(file_get_contents("php://input"));

$query = "INSERT INTO products (name, buying_price, selling_price, total_amount, available_amount, user_id) VALUES ( ?, ?, ?, ?, ?, ?)";
$statement = $connect->prepare($query);
$statement->execute([$data->name,  $data->bPrice, $data->cPrice, $data->amount, $data->amount, $_SESSION['user_id']]);

echo json_encode('success'); 

?>