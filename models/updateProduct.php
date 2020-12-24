

<?php

include('../config/db-connection.php');
header('Content-Type: application/json');


session_start();

$data = json_decode(file_get_contents("php://input"));

$query = "UPDATE products SET buying_price = ?, selling_price = ?, total_amount = total_amount + ?, available_amount = available_amount + ?, date_of_update = now() WHERE id = ?";
$statement = $connect->prepare($query);
$statement->execute([$data->bPrice, $data->cPrice, $data->amount, $data->amount, $data->id]);

echo json_encode('success'); 

?>