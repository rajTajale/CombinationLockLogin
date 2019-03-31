<?php include('server.php') ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Registration</title>
    <link rel="stylesheet" type="text/css" href="reg.css">
    <script src="combinationLock.js"></script>
  </head>

  <body onload="initializeCanvas();">
    <div class="container">
      <h2>Welcome to Registration By <i>Raj Tajale </i>and <i>Nhuja Shakya</i></h2>
      <div class="lock_container">
        <canvas id="canvas" width="500" height="500">
        </canvas>
        <br><br>
        <form class="centered">
          <input type="button" value="Nudge left" onclick="nudgeLeft();">
          <input type="button" value="Nudge right" onclick="nudgeRight();">
          <input id ="selectButton"type="button" value="Select" onclick="selectNumber();">

          <!-- EXTRA CREDIT: -->
          <br><br>
          Target:
          <input type="number" id="target" value="0" size="2" maxlength="2" min="0" max="39" step="1" required>
          &nbsp;&nbsp;
          <input type="button" value="Left to target" onclick="leftToTarget(this.form);">
          <input type="button" value="Right to target" onclick="rightToTarget(this.form);">
        </form>
        <br><br>
      </div>

      <form action="registration.php" method="post">
        <?php include('errors.php') ?>
        <div class="credential">
          <div >
            <label for="username">Username: </label>
            <input type="text" name="username" required>
          </div>
          <div>
            <label for="password">Password  :</label>
            <input id="destination" type="password" name="password" required>
          </div>
          <button type="submit" name="register_user" >Register</button>
          <p>Already a user?<a href="login.php"><b>Log in</b></a></p>

        </div>


      </form>
    </div>

  </body>
</html>
