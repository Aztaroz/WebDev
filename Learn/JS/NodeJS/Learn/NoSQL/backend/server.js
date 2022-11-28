const { MongoClient, ObjectId } = require("mongodb")
const express = require('express')
// const cors = require('cors')
const app = express()
const port = 3000
// const { MongoClient } = require("mongodb")
const uri = "mongodb://127.0.0.1:27017/"
// app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    const client = new MongoClient(uri)
    await client.connect()
    const objects = await client.db('mydb').collection('s_collection').find({}).project({ _id: 0, Saving: 0, GPA: 0, Salary: 0 }).toArray()
    await client.close()
    res.status(200).send(objects)

})


app.get('/slist', async (req, res) => {
    const client = new MongoClient(uri)
    await client.connect()  // wait
    const objects = await client.db('mydb').collection('s_collection').find({}).toArray()   //wait
    await client.close()    //wait
    res.status(200).send(objects)

})

app.post('/slist/create', async (req, res) => {
    const Object = req.body
    const client = new MongoClient(uri)
    await client.connect()
    await client.db('mydb').collection('s_collection').insertOne(
        {
            "StudentID": Object['StudentID'],
            "Title": Object['Title'],
            "Name": Object['Name'],
            "Surname": Object['Surname'],
            "Field": Object['Field'],
            "Project": Object['Project'],
            "Savings": Object['Savings'],
            "GPA": Object['GPA'],
            "Salary": Object['Salary']
        }
    );

    await client.close()
    res.status(200).send({
        "status": "OK",
        "message": "Object is created",
        "StudentID": Object['StudentID']
    });
})

app.put('slist/update', async (req, res) => {
    const Object = req.body
    const id = Object._id
    const client = new MongoClient(uri)
    await client.db('mydb').collection('s_collection').updateOne({ '_id': ObjectId(id) },
        {
            '$set': {
                "StudentID": Object['StudentID'],
                "Title": Object['Title'],
                "Name": Object['Name'],
                "Surname": Object['Surname'],
                "Field": Object['Field'],
                "Project": Object['Project'],
                "Savings": Object['Saving'],
                "GPA": Object['GPA'],
                "Salary": Object['Salary']
            }
        })
    await client.close()
    res.status(200).send({
        "status": "OK",
        "message": "Object is created",
        "StudentID": Object['StudentID']
    });
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



// const connectDB = async() => {
//     try{
//         const client = new MongoClient(uri)
//         await client.connect()
//         console.log(`MongoDB connected successfully`)
//     }
//     catch (err){
//         console.log(err)
//         process.exit(1)
//     }
// }

// connectDB()