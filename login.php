<?php include('server.php') ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Login</title>
  </head>
  <body>
    <div class="container">
      <h2>Welcome. Log In </h2>

      <form action="login.php" method="post">
        <?php include('errors.php') ?>
        <div>
          <label for="username">Username  :</label>
          <input type="text" name="username" required>
        </div>
        <div>
          <label for="password">Password  : </label>
          <input type="password" name="password" required>
        </div>
        <button type="submit" name="login_user">Login</button>
        <p>New user?<a href="registration.php"><b>Sign up!</b></a></p>

      </form>
    </div>

  </body>
</html>
