<?php

$connect = new PDO("mysql:host=localhost;dbname=family-super-shop", "root", "");



function checkUser($username, $password, $connect) {
  $query = "SELECT * FROM users WHERE username = ? AND password = ?";
  $statement = $connect->prepare($query);
  $statement->execute([$username, $password]);
  $result = $statement->fetchAll();
  $count = $statement->rowCount(); 
  if ($count > 0) {
    session_start();
    $_SESSION['user_id'] = $result[0]['id'];
    $_SESSION['username'] = $result[0]['username'];
    header('location: product.php');
  } else {
    return "Username or Password isn't Correct";
  }
}


$allProducts = array();
fetchAllProducts('total_amount', $connect);

function fetchAllProducts($order_by, $connect) {
  $query = "SELECT * FROM products ORDER BY ?  DESC";
  $statement = $connect->prepare($query);
  $statement->execute([$order_by]);
  $result = $statement->fetchAll();

  global $allProducts;
  $allProducts = array();
  foreach($result as $row) { 
    array_push($allProducts, $row);
  }
}

?>