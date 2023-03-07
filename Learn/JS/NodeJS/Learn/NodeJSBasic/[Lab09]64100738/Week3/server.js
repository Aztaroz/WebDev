const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "64100738",
    database: "itd62_276"
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
    db.query("SELECT * FROM user", (error, result, fields) => {
        if (error) throw error
        if (result.length == 0 || result === undefined)
            message = "Table developmentteam is empty"
        else
            message = "Get developmentteam successfully"

        res.status(200).send({ error: false, data: result, msg: message })
    })
})

app.get('/getData/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    db.query("SELECT * FROM user WHERE id =?",[id], (error, result, fields) => {
        if (error) throw error
        if (result.length == 0 || result === undefined)
            message = "Table developmentteam is empty"
        else
            message = "Get developmentteam successfully"

        res.status(200).send({ error: false, data: result, msg: message })
    })
})

app.post('/insertData', (req, res) => {
    const { hashed_password, first_name, last_name, email, user_role_id } = req.body
    res.send(req.body);
    console.log(hashed_password)
    db.query(`INSERT INTO user (hashed_password, first_name, last_name, email, user_role_id) VALUES ("${hashed_password}","${first_name}","${last_name}","${email}",${user_role_id})`, (error, result, fields) => {
        if (error) throw error
        // res.status(200).send({ error: false, data: result })
        res.status(200).send()
    })
})

app.put('/updateData/:id', (req, res) => {
    const { hashed_password, first_name, last_name, email, user_role_id } = req.body
    const id =  req.params.id;
    console.log(hashed_password)
    db.query(`UPDATE user SET hashed_password = '${hashed_password}', first_name = '${first_name}', last_name = '${last_name}', email = '${email}', user_role_id = ${user_role_id} WHERE id = ${id};`, (error, result, fields) => {
        if (error) throw error
        // res.status(200).send({ error: false, data: result })
        res.status(200).send()
    })
})



app.delete('/deleteData/:id', (req, res) => {
    const id =  req.params.id;
    db.query(`DELETE FROM user WHERE id = ${id}`, (error, result, fields) => {
        if (error) throw error
        // res.status(200).send({ error: false, data: result })
        // res.status(200).send()
    })
})





app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})
