<?php

include('../config/db-connection.php');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

$searchedProducts = array();
if ($data->searchType === 'id') {
  $query = "SELECT * FROM products WHERE id = ?";
  $statement = $connect->prepare($query);
  $statement->execute([$data->value]);
  $result = $statement->fetchAll();
} else if ($data->searchType === 'name') {
  $query = "SELECT * FROM products WHERE  name LIKE '%" . $data->value . "%'";
  $statement = $connect->prepare($query);
  $statement->execute();
  $result = $statement->fetchAll();
} else if ($data->searchType === 'price') {
  $query = "SELECT * FROM products WHERE  selling_price = ?";
  $statement = $connect->prepare($query);
  $statement->execute([$data->value]);
  $result = $statement->fetchAll();
}






foreach($result as $row) { 
  array_push($searchedProducts, $row);
}

echo json_encode($searchedProducts); 

?>