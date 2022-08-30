/*#########################################################################################################
                            Ternary Operator (Condition Operator, Optional Operator)
#########################################################################################################*/

// ตัวแปร = เงื่อนไข? ค่าที่ส่งกลับถ้า true : ค่าที่ส่งกลับถ้า false เช่น

var x = (1 > 0) ? true:false            // x = true

let y = (0 != -0.0) ? true:false        //y = false

var x = 20
var s = (x % 2 == 0) ? 'Even':'Odd'     //s = Even

let login = 'admin'
let password = '1234'
let msg = (login == '' || password == '') ? 'Please Enter...' : 'OK'    // msg = OK
