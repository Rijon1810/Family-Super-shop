<?php

include('../config/db-connection.php');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));


$query = "SELECT * FROM products WHERE id = ? ";
$statement = $connect->prepare($query);
$statement->execute([$data->id]);
$count = $statement->rowCount(); 
if ($count > 0) echo json_encode('success'); 
else echo json_encode('failed'); 

?>