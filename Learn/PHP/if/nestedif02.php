<?php
$year = 2022;
if($year%4 == 0){
    if($year%100!=0){
        echo $year."คือ ปีที่มี 365 วัน";
    }
    else {
        echo $year. "คือ ปีที่มี 365 วัน";
    }
}
else if($year % 400==0){
    echo $year. "คือ ปีที่มี 366 วัน";
}
else{
    echo $year. "คือ ปีที่มี 365 วัน";
}
?>