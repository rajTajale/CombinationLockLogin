<?php

session_start();

//initailizing the variables

$username = "";

$errors = array();

//connecting to SQLiteDatabase

$db = mysqli_connect('localhost','detoxx','','Clients') or die("Couldn't connect to the database");

//registering the users
if(isset($_POST['register_user'])) {

  $username = mysqli_real_escape_string($db, $_POST['username']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  //form validation

  if(empty($username)){
    array_push($errors, "Username is required.");
  }

  if(empty($password)){
    array_push($errors, "Password is required.");
  }

  //checking the database for existing user with same Username

  $user_check_query = "SELECT * FROM users WHERE username = '$username' LIMIT 1";
  $results = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($results);

  if($user){
    if($user['username'] === $username){
      array_push($errors,"Username already exists.");
    }
  }


  //Registering the user if no errors

  if(count($errors) == 0){

    $query = "INSERT INTO users (username, password) VALUES ('$username','$password')";

    mysqli_query($db, $query);
    $_SESSION['username'] = $username;
    $_SESSION['success'] = "You are now logged in.";
    header("location:index.php");

  }

}


//logging in the users

if(isset($_POST['login_user'])) {

  $username = mysqli_real_escape_string($db, $_POST['username']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  if(empty($username)){
    array_push($errors, "Username is required.");
  }

  if(empty($password)){
    array_push($errors, "Password is required.");
  }

  if(count($errors) == 0){

    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $results = mysqli_query($db, $query);


    if(mysqli_num_rows($results) == 1) {

      $_SESSION['username'] = $username;
      $_SESSION['success'] = "Succesfully logged in.";
      header("location:index.php");

    }else{
      array_push($errors, "Wrong username or password. Please try again.");
    }
  }

}

?>
