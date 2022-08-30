//การกำหนดค่าต่อเนื่อง (Chaining Assignment)
var x, y, z
x = y = z = 10      //x = 10, y = 10, z = 10

//exponentiation (การยกกำลัง) จะใช้ ** ตั้งแต่ ECMAScript 7 เป็นต้นมา (ใช้แทน Math.pow())
x = 10**2

//การหารถ้าลงตัวก็จะหารแบบปกติ แต่ถ้าไม่ลงตัวจะมีเลขทศนิยม เช่น
var a = 10 / 2        //5
var b = 100 / 8       //12.5
var c = 10 / 2.5      //4

//ตัวเลขที่เขียนในเครื่องหมาย "" หรือ '' หรือ `` นั้นเรียกว่า String Number สามารถนำไปคำนวณได้ตามปกติ ยกเว้น + ที่จะใช้เชื่อมต่อ String เช่น
let a = "100" * "10"        //1000
let b = 10 - '2'            //8
let c = "100" / '25'        //4
let d = 108 + '1009'        //1081009 เป็นการเชื่อมต่อตัวเลขกับสตริง
// หากจะนำ String Number มา + กันจะต้องแปลงเป็นตัวเลขก่อน


/*#########################################################################################################
                                        Increment & Decrement Operator
#########################################################################################################*/


//การวาง Operator ++ -- ไว้ด้านหน้า (Prefix) หรือข้างหลัง (Suffix หรือ Postfix) หากจัวแปรอยู่แบบเดี่ยว ๆ นั้นค่าที่ได้จะไม่ต่างกัน เช่น
var x = 10
x++     // x = 11
x--     // x = 10

let y = 10
++y     // y = 11
--y     // y = 10


// แต่หากต้องดำเนินการร่วมกับค่าอื่น ผลที่ได้จะแตกต่างออกไป เช่น ++a จะถูกดำเนินการก่อน แต่หากเอาไว้หลังตัวแปร เช่น a-- จะถูกดำเนินการทีหลัง ดังตัวอย่าง
var x = 10
y = 2 + (++x)       // y = 13


var x = 10
var y = 2 + (x++)   // y = 12   เพราะว่าจะบวกค่าเดิมของ x กับ 2 ก่อนแล้วกำหนดค่าให้ y จากนั้นจึงเพิ่มค่า x ไปอีก 1 (x++)


/*#########################################################################################################
                                             Logical Operator
#########################################################################################################*/


/*      && = AND    (true & true = true)
        || = OR     (false & false = false)
        !  = NOT    (เปลี่ยนค่าให้เป็นตรงข้าม true > false , false > true)
*/