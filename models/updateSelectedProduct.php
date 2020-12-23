
<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


session_start();

$data = json_decode(file_get_contents("php://input"));

$query = "UPDATE products SET available_amount = available_amount - ?, total_sell = total_sell + ? WHERE id = ?";
$statement = $connect->prepare($query);
$statement->execute([$data->amount, $data->total_price, $data->id]);

echo json_encode('success'); 

?>