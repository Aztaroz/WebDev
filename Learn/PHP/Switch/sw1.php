<?php
// switch (สิ่งที่ต้องการตรวจสอบ){
//     case คำที่ 1;
//         คำสั่ง
//         break;
//     case คำที่ 2;
//         คำสั่ง
//         break;
//     case คำที่ 3;
//         คำสั่ง
//         break;
//     default:
//     คำสั่ง กรณีไม่ตรงกับกรณีใด ๆ เลย
// }

$size = "S";
switch($size){
    case "S":
        echo "ขนาด S";
        break;
    case "M":
        echo "ขนาด M";
        break;
    case "L":
        echo "ขนาด L";
        break;
    default:
        echo "ขนาดไม่ระบุ";
}
?>
