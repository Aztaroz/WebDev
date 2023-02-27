const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "64100738",
    database: "project_demo"
})
db.connect((err) => {
    if (err) { err }
    console.log("MySQL connected")
})
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

// app.post('/getDoctors', (req, res) => {
//     let message = "";
//     let results = "";
//     const { username, password } = req.body
//     if (!username || !password) {
//         message = "Username or Password not present";
//         res.status(400).send({ error: false, data: results, msg: message })
//     } else {
//         db.query(
//             'SELECT * FROM users WHERE username = ? and password = ? and activeFlag = 1',
//             [username, password],
//             function (err, results) {
//                 if (err)
//                     console.log(err);
//                 if (results.length == 0 || results === undefined) {
//                     message = "Username or Password is wrong";
//                     res.status(400).send({ error: false, data: results, msg: message })
//                 } else {
//                     db.query("SELECT * FROM doctors", (error, results, fields) => {
//                         if (error)
//                             console.log(error);
//                         if (results.length == 0 || results === undefined)
//                             message = "Table users is emty !";
//                         else {
//                             message = "Get users succesfuly.";
//                             res.status(200).send({
//                                 error: false, data: results, msg: message
//                             })

//                         }
//                     })
//                 }
//             })
//     }
// })

app.get('/getDoctors', (req, res) => {
    db.query("SELECT * FROM doctors", (error, results, fields) => {
        if (error)
            console.log(error);
        if (results.length == 0 || results === undefined)
            message = "Table users is emty !";
        else {
            message = "Get users succesfuly.";
            res.status(200).send({
                error: false, data: results, msg: message
            })

        }
    })
})