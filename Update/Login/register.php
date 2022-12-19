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

    $sql = "insert into users(`id`, `username`, `password`) values (NULL, '".$uname."', '".$pass."')";

    $result = mysqli_query($link, $sql);

    if($result){
        echo "Success!";
        exit();
    }
    else{
        echo "Wrong!";
    }
}
?>