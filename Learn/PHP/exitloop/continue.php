<?php
// คำสั่ง continue เป็นการสั่งให้วนลูปต่อไป โดยไม่ทำคำสั่งที่เหลือภายในลูปนั้นต่อ
$sum = 0;
for ($i = 0; $i<= 10; $i++ ){
    if($i == 5){
        continue;
    }
    $sum += $i;
}
echo "Sum is: ".$sum;
?>