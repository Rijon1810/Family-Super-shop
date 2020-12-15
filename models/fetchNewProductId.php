

<?php

include('../config/db-connection.php');
header('Content-Type: application/json');

$query = "SELECT MAX(id) FROM products";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();

echo json_encode($result[0][0]); 

?>