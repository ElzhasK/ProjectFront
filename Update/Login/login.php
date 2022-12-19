<?php

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'elzha');
define('DB_PASSWORD', 'Elzhas2004');
define('DB_NAME', 'webpage');
 
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

if(isset($_POST['username'])){
    $uname = $_POST['username'];
    $pass = $_POST['password'];

    $sql = "select * from users where username = '".$uname."' AND password = '".$pass."' limit 1";

    $result = mysqli_query($link, $sql);

    if(mysqli_num_rows($result) == 1){
        echo "Logged IN!";
        exit();
    }
    else{
        echo "Wrong data!";
    }
}
?>