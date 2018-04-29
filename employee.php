<?php
//Database Connector
include 'DatabaseConnection.php';
$firstname= ucwords(strtolower($_POST["firstName"]));
$lastname= ucwords(strtolower($_POST["lastName"]));
$raj= new DatabaseConnection();
$query="INSERT INTO `EMPLOYEE`(`Fname`, `Lname`) VALUES ('$firstname','$lastname')";
$raj->insertDatabase($query);
echo $firstname." ".$lastname;
?>