<?php

session_start();

if(!isset($_SESSION['username'])){

  $_SESSION['msg'] = "You need to login first.";
  header("location:login.php");
}

if(isset($_GET['logout'])){

  session_destroy();
  unset($_SESSION['username']);
  header("location:login.php");

}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Home</title>
  </head>
  <body>

    <h1>HomePage</h1>
    <div class="content">
      <?php if(isset($_SESSION['success'])) : ?>
        <div>
          <h3>
            <?php
              echo $_SESSION['success'];
              unset($_SESSION['success']);

            ?>

          </h3>


        </div>
      <?php endif ?>

      <?php if(isset($_SESSION['username'])) : ?>

        <h3>Welcome <?php echo $_SESSION['username']; ?> </h3>

        <p><a href="index.php?logout='1'">Logout</a></p>

      <?php endif ?>
    </div>



  </body>
</html>
