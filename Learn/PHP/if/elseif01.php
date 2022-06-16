<?php
$score = 75;
if ($score>=90){ $grade = "A"; }
elseif ($score>=80){$grade = "B";}
elseif ($score>=70){$grade = "C";}
elseif ($score>=60){$grade = "D";}
else {$grade = "F";}
echo "คะแนนของคุณคือ $score คะแนน คะแนนนี้คือ $grade";
?>