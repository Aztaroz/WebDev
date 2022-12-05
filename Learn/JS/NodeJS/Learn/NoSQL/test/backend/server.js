/*
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
    const objects = req.body
    const client = new MongoClient(uri)
    await client.connect()
    await client.db('mydb').collection('s_collection').insertOne(
        {
            "StudentID": objects['StudentID'],
            "Title": objects['Title'],
            "Name": objects['Name'],
            "Surname": objects['Surname'],
            "Field": objects['Field'],
            "Project": objects['Project'],
            "Savings": objects['Savings'],
            "GPA": objects['GPA'],
            "Salary": objects['Salary']
        }
    );

    await client.close()
    res.status(200).send({
        "status": "OK",
        "message": "Object is created",
        "StudentID": objects['StudentID']
    });
})

app.put('/slist/update', async (req, res) => {
    const objects = req.body
    const id = objects._id
    const client = new MongoClient(uri)
    await client.connect()
    await client.db('mydb').collection('s_collection').updateOne({ '_id': ObjectId(id) },
        {
            '$set': {
                "StudentID": objects['StudentID'],
                "Title": objects['Title'],
                "Name": objects['Name'],
                "Surname": objects['Surname'],
                "Field": objects['Field'],
                "Project": objects['Project'],
                "Savings": objects['Savings'],
                "GPA": objects['GPA'],
                "Salary": objects['Salary']
            }
        })
    await client.close()
    res.status(200).send({
        "status": "OK",
        "message": "Object is updated",
        "StudentID": objects['StudentID']
    });
})

app.delete('/slist/delete', async (req, res) => {
    const objects = req.body
    const id = objects._id
    const client = new MongoClient(uri)
    await client.connect()
    await client.db('mydb').collection('s_collection').deleteOne({ '_id': ObjectId(id) })
    await client.close()
    res.status(200).send({
        "status": "OK",
        "message": "Object is deleted",
        "StudentID": objects['StudentID']
    });
})

app.get('/slist/field/:searchText', async (req,res) => {
    const {params} = req
    const searchText = params.searchText
    const client = new MongoClient(uri)
    await client.connect()
    const objects = await client.db('mydb').collection('s_collection').find({"$text": {"$search": searchText}}).toArray()

    await client.close()
    res.status(200).send({
        "status": "OK",
        "message": "Object Found",
        "StudentID": objects['StudentID']
    });
})

// app.get('/slist/field/id', async (req,res) => {
//     const {params} = req
//     const searchText = params.searchText
//     const client = new MongoClient(uri)
//     await client.connect()
//     const objects = await client.db('mydb').collection('s_collection').find({"$text": {"$search": searchText}})

//     await client.close()
//     res.status(200).send({
//         "status": "OK",
//         "message": "Object Found",
//         "StudentID": objects['StudentID']
//     });
// })



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

*/



















const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello ITD Dev')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

const { MongoClient, ObjectId } = require('mongodb');
// const uri = 'mongodb://localhost:27017';
const uri = "mongodb://127.0.0.1:27017/";

// const connectDB = async() => {
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         console.log('MongoDB is now conneted.')

//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// connectDB();

app.get('/slist', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0, GPA:0, Savings:0, Salary:0}).toArray();
    const objects = await client.db('mydb').collection('s_collection').find({}).sort({ "GPA": -1 }).limit(10).toArray();
    await client.close();
    res.status(200).send(objects);

})

app.post('/slist/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').insertOne({
        "StudentID": object['StudentID'],
        "Title": object['Title'],
        "Name": object['Name'],
        "Surname": object['Surname'],
        "Field": object['Field'],
        "Project": object['Project'],
        "Savings": object['Savings'],
        "GPA": object['GPA'],
        "Salary": object['Salary'],
        "Created_Date": object['Created_Date']
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object['StudentID']
    })
})

app.put('/slist/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').updateOne({ '_id': ObjectId(id) },
        {
            "$set": {
                "StudentID": object['StudentID'],
                "Title": object['Title'],
                "Name": object['Name'],
                "Surname": object['Surname'],
                "Field": object['Field'],
                "Project": object['Project'],
                "Savings": object['Savings'],
                "GPA": object['GPA'],
                "Salary": object['Salary'],
                "Created_Date": object['Created_Date']
            }
        });
    await client.close();
    res.status(200).send({
        'status': "ok",
        'message': "Object with ID " + id + " is updated.",
        'object': object
    });
})

app.delete('/slist/delete', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').deleteOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID" + id + " is deleted."
    });
})


app.get('/slist/field/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('mydb').collection('s_collection').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).limit(5).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

app.get('/slist/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const object = await client.db('mydb').collection('s_collection').findOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "ID": id,
        "Complaint": object
    });
})