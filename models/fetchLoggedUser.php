

<?php

include('../config/db-connection.php');
header('Content-Type: application/json');
session_start();
echo json_encode($_SESSION['username']); 

?>