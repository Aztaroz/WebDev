<?php
$sum = 0;
for ($i = 1; $i <= 10; $i++){
    if($i == 5){
        break;
    }
    $sum += $i;
}
echo "Sum is: " .$sum;
?>