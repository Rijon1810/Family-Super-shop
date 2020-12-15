<?php

include('config/db-connection.php');
$message = '';

session_start();

$message = 'Hi, <span class="span-inner">' . $_SESSION['username'] . '</span>';




?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Family Super-Shop</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/script.js" defer></script>
  </head>
  <body>
    <header>
      <h2>Family Super-Shop <span>Basudebpur, Natore</span></h2>
      <span class="span-outer"><?php echo $message; ?></span>
      <button id="aside-toggle" class="">
        <img src="img/angle-left.png" alt="" />
      </button>
    </header>

    <aside id="side-bar" class="">
      <ul>
        <li>
          <a href="#" class="active side-link"
            ><img src="img/dashboard.png" alt="" /><span>Dasboard</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-link"
            ><img src="img/all-product.png" alt="" /><span>All Product</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-link"
            ><img src="img/add-product.png" alt="" /><span>Add Product</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-link"
            ><img src="img/sold-product.png" alt="" /><span>Sold Product</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-link"
            ><img src="img/log-out.png" alt="" /><span>Logout</span>
          </a>
        </li>
      </ul>
    </aside>

    <div class="product-container" id="product-container">
      <div class="product-container-inner" id="product-container-inner">
        
      </div>
    </div>
  </body>
</html>
