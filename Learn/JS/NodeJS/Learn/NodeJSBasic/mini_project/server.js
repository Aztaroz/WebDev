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


app.delete('/deleteData/:id', (req, res) => {
    // const id =  req.params.id;
    db.query('DELETE FROM customer WHERE customer_id = ?', [req.params.id], (error, result, fields) => {
        if (error) throw error
        res.status(200).send({ error: false, data: result })
        // res.status(200).send()
    })
})

app.post('/getUser', (req, res) => {
    let message = "";
    let results = "";
    const { username, password } = req.body
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({ status: 400, error: false, data: results, msg: message })
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeflag = 1',
            [username, password],
            function (err, results) {
                if (err)
                    console.log(err);
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong";
                    res.status(400).send({ status: 400, error: false, data: results, msg: message })
                } else {
                    const role = results[0].username
                    db.query("SELECT * FROM customer", (error, results, fields) => {
                        if (error)
                            console.log(error);
                        if (results.length == 0 || results === undefined)
                            message = "Table users is empty !";
                        else {
                            message = "Get users succesfuly.";
                            res.status(200).send({
                                status: 200, error: false, data: results, msg: message, role: role
                            })
                        }
                    })
                }
            })
    }
})


app.post('/insertData', (req, res) => {
    let message = "";
    let results = "";
    const { username, password, name, lastname, DoB, email } = req.body
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({ status: 400, error: false, data: results, msg: message })
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeflag = 1',
            [username, password],
            function (err, results) {
                if (err)
                    console.log(err);
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong";
                    res.status(400).send({ status: 400, error: false, data: results, msg: message })
                }
                if (results[0].authority == 1 || results[0].authority == 2) {
                    db.query('INSERT INTO customer (name, lastname, DoB, email) VALUES (?,?,?,?)', [name, lastname, DoB, email],
                        (error, result, fields) => {
                            if (error)
                                console.log(error);
                            if (results.length == 0 || results === undefined)
                                message = "Table users is empty !";
                            else {
                                message = "Post data succesfuly.";
                                res.status(200).send({
                                    status: 200, error: false, data: result, msg: message
                                })
                            }
                        })
                } else {
                    message = "User not have permistion to create data";
                    res.status(400).send({ status: 400, error: false, data: {}, msg: message })
                }
            })
    }
})

app.post('/updateData/:id', (req, res) => {
    let message = "";
    let results = "";
    const { username, password, name, lastname, DoB, point, rank_id, email } = req.body
    const id = req.params.id
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({ status: 400, error: false, data: results, msg: message })
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeflag = 1',
            [username, password],
            function (err, results) {
                if (err)
                    console.log(err);
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong";
                    res.status(400).send({ status: 400, error: false, data: results, msg: message })
                }
                if (results[0].authority == 1 || results[0].authority == 2 || results[0].authority == 3) {
                    db.query(`UPDATE customer SET name=?, lastname=?, DoB=?, point=?, rank_id=?, email=? WHERE customer_id=?;`, [name, lastname, DoB, point, rank_id, email, id], (error, result, fields) => {
                        if (error)
                            console.log(error);
                        else {
                            message = "Edit data succesfuly.";
                            res.status(200).send({
                                status: 200, error: false, data: results, msg: message
                            })
                        }
                    })
                } else {
                    message = "User not have permistion to update data";
                    res.status(400).send({ status: 400, error: false, data: {}, msg: message })
                }
            })
    }
})


app.post('/deleteData/:id', (req, res) => {
    let message = "";
    let results = "";
    const { username, password } = req.body
    console.log(req.body);
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({ status: 400, error: false, data: results, msg: message })
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeflag = 1',
            [username, password],
            function (err, results) {
                if (err)
                    console.log(err);
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong";
                    res.status(400).send({ status: 400, error: false, data: results, msg: message })
                }
                console.log(results[0].authority);
                if (results[0].authority == 1 || results[0].authority == 2) {
                    db.query('DELETE FROM customer WHERE customer_id = ?', [req.params.id], (error, result, fields) => {
                        if (error)
                            console.log(error);
                        else {
                            message = "Delete data succesfuly.";
                            res.status(200).send({
                                status: 200, error: false, data: results, msg: message
                            })
                        }
                    })
                } else {
                    message = "User not have permistion to delete data";
                    res.status(400).send({ status: 400, error: false, data: {}, msg: message })
                }
            })
    }
})



app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})
