<?php

include('../config/db-connection.php');
header('Content-Type: application/json');

fetchAllProducts($connect);

echo json_encode($allProducts); 

?>