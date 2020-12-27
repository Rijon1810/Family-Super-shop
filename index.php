<?php

include('config/db-connection.php');
$message = '';
if (isset($_POST['submit'])) {
  $message = checkUser($_POST['username'], $_POST['password'], $connect);
}



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
    <title>Log In | Bappy Super-Shop</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <header>
      <h2>Bappy Super-Shop <span>Basudebpur, Natore</span></h2>
    </header>

    <div class="log-in-container">
      <h2>Log In</h2>
      <form action="index.php" class="login-form" method="post">
        <p class="alert-msg"><?php echo $message ?></p>
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
        <input type="submit" value="Submit" name="submit"/>
      </form>
    </div>
  </body>
</html>
