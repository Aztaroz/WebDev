// เช็ค datatype ได้ด้วยคำสั่ง typeof

/*ทศนิยมและตัวเลข = number
    ยังไม่ประกาศตัวแปร = undefined
    ถ้าเป็นค่า null หรือ object = object
    ถ้าเป็นฟังก์ชั่น หรือคลาส หรือสมาชิกของคลาส = function */

var a = 123
console.log("a = "+typeof a)    //number

var b = 4.56
console.log("b = "+typeof b)    //number

var c = "hello"
console.log("c = "+typeof c)    // string

var d = false
console.log("d = "+typeof d)    //boolean

var e
console.log("e = "+typeof e)    //undefined

console.log("console = "+typeof console)    //object

console.log("console.log = "+typeof console.log)    //function

console.log("null = "+typeof null)  //object

console.log("x = "+typeof x)    //undefined (ยังไม่ประกาศตัวแปร)