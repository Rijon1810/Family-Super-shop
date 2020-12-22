<?php

include('../config/db-connection.php');
header('Content-Type: application/json');

fetchSoldProducts($connect);

echo json_encode($soldProducts); 

?>