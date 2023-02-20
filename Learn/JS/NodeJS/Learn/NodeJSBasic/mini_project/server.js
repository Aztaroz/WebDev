const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "64100738",
    database: "db_64100738"
})

db.connect((err) => {
    if (err) { err }
    console.log("MySQL connected");
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Everyone')
})

app.get('/getData', (req, res) => {
    db.query("SELECT * FROM customer", (error, result, fields) => {
        if (error) throw error
        if (result.length == 0 || result === undefined)
            message = "Table is empty"
        else
            message = "Get Data successfully"

        res.status(200).send({ error: false, data: result, msg: message })
    })
})

app.get('/getData/:id', (req, res) => {
    db.query(`SELECT * FROM customer WHERE customer_id = ${req.params.id}`, (error, result, fields) => {
        if (error) throw error
        if (result.length == 0 || result === undefined)
            message = "Table is empty"
        else
            message = "Get Data successfully"

        res.status(200).send({ error: false, data: result, msg: message })
    })
})

app.post('/insertData', (req, res) => {
    const { name, lastname, DoB, email } = req.body
    // res.send(req.body);
    console.log(req.body);
    db.query('INSERT INTO customer (name, lastname, DoB, email) VALUES (?,?,?,?)', [name, lastname, DoB, email],
        (error, result, fields) => {
            if (error) throw error
            res.status(200).send({ error: false, data: result })
            res.status(200).send()
        })
})

// app.put('/updateData/:id', (req, res) => {
//     const { name, lastname, DoB, point, rank_id, email } = req.body
//     const id = req.params.id;
//     db.query(`UPDATE customer SET name = ?, lastname=?, DoB=?, point=?, rank_id=?,email=? WHERE customer_id =?`,[name, lastname, DoB, point, rank_id, email,id], (error, result, fields) => {
//         if (error) throw error
//         // res.status(200).send({ error: false, data: result })
//         res.status(200).send()
//     })
// })

app.put('/updateData/:id', (req, res) => {
    const { name, lastname, DoB, point, rank_id, email } = req.body
    const id = req.params.id;
    db.query(`UPDATE customer SET name=?, lastname=?, DoB=?, point=?, rank_id=?, email=? WHERE customer_id=?;`, [name, lastname, DoB, point, rank_id, email, id], (error, result, fields) => {
        if (error) throw error
        // res.status(200).send()
        res.status(200).send({ error: false, data: result })
    })
})




app.delete('/deleteData/:id', (req, res) => {
    // const id =  req.params.id;
    db.query(`DELETE FROM customer WHERE customer_id = ${req.params.id}`, (error, result, fields) => {
        if (error) throw error
        res.status(200).send({ error: false, data: result })
        // res.status(200).send()
    })
})





app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})
