<?php

include('../config/db-connection.php');
header('Content-Type: application/json');

echo json_encode($allProducts); 

?>