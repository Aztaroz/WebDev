// สามารถเขียนตัวแปรในบรรทัดถัดไปได้ เช่น
var a =
    20  // a = 20


// ###########################  Numeric ###########################
//ข้อมูลชนิดตัวเลข
var a = 1 , b = 2       //ใช้ var หรือ let ก็ได้
var c = +123            // c = 123
var d = 007             // d = 7
var e = 1.0             // e = 1

// ห้ามมี , หรือ _ ขั้นระหว่างตัวเลข เช่น
//var a = 123,456 // Error
var b = 7_890   // Error

// JS ไม่ยึดติดกับข้อมูลทำให้สามารถเปลี่ยนจาก จำนวนเต็ม > ทศนิยม หรือ ทศนิยม > จำนวนเต็ม ได้ เช่น
var x = 123     //จำนวนเต็ม
    x = 4.50    //ทศนิยม
    
var y = 7.11    //ทศนิยม
    y = 101     //จำนวนเต็ม



