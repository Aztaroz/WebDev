/*#########################################################################################################
                                    Convert String Number to Number
#########################################################################################################*/

/*  
        parseInt(data) = Convert to int
        parseFloat(data) = Convert to Float

        Number.isInteger(data)  =   ถ้าเป็นจำนวนเต็มจะ return true
*/

var strNum  =   '123'
var intNum  =   parseInt(strNum)
let a = parseInt('123') + parseFloat('0.456')
let b = Number.isInteger(123)   //*true
let c = Number.isInteger(4.56)  //*false

console.log(a,"\n",b,"\n",c)


//! ฟังก์ชั่น parseInt() และ parseFloat สามารถแยกตัวอรกที่ขึ้นต้นของ String ได้

var d = parseInt('100MB')           // d = 100
var e = parseFloat('120.25GB')      // e = 120.25
var f = parseInt('-90degree')       // f = -90
var g = parseInt('ECMAScript8')     // NAN
var h = parseFloat('V8 Enging')     // NAN