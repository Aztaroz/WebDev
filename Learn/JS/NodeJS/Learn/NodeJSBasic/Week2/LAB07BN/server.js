const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mysql = require('mysql2')
const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"64100738",
    database:"itd62_276"
})

db.connect((err)=>{
    if(err){err}
    console.log("MySQL connected");
})

app.use(cors())
app.use(express.json())

app.get('/',(req, res) => {
    res.send('Hello Backend')
})

app.get('/getUser', (req,res) => {
    db.query("SELECT * FROM user",(error,results,fields) => {
        if (error) throw error
        if (results.legth == 0 || results === undefined)
            message = "Table user is empty"
        else
            message = "Get user successfully"

        res.status(200).send({error:false, data:results, msg:message})
    })
})

app.listen(port,() => {
    console.log(`App is running on http://localhost:${port}`);
})
