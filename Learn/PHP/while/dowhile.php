<?php
    $count = 0;
do{
    $r = rand(); //สุ่มเลข
    echo "$r <br>";
    $count ++;

}   while($r <= 30000);
echo "ต้องการสุ่ม $count ครั้งจึงจะได้เลขสุ่มที่มากกว่า 30000";

?>