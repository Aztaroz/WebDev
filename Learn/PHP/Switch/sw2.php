<?php
$month = "April";
switch($month){
    case "January":
    case "March":
    case "May":
        echo "มี 31 วัน";
        break;
    case "April":
    case "June":
        echo "มี 30 วัน";
}
?>