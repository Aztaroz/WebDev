const express = require('express');
const app = express();
const cors = require('cors');
const port = 4596;
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/";

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Welcome to Sleep Analysis');
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});

//Pass
app.get('/sleepdata', async (req, res) =>{
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('proj-db').collection('SleepData').find({}).toArray();
    await client.close();
    res.status(200).send(objects);
})

//Pass
app.post('/sleepdata/create', async (req,res) => {
    const objects = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('proj-db').collection('SleepData').insertOne({
        "Year": objects['Year'],
        "Period": objects['Period'],
        "Avg hrs per day sleeping": objects['Avg hrs per day sleeping'],
        "Type of Days": objects['Type of Days'],
        "Age Group": objects ['Age Group'],
        "Sex": objects['Sex']
    });

    await client.close();
    res.status(200).send({
        "status": "OK",
        "message":"Object is created",
        "object": objects['StudentID'] //Edit 
    });
});

//Pass
app.put('/sleepdata/update', async (req, res) => {
    const objects = req.body;
    const id = objects._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('proj-db').collection('SleepData').updateOne({ '_id': ObjectId(id) },
        {
            "$set": {
                "Year": objects['Year'],
                "Period": objects['Period'],
                "Avg hrs per day sleeping": objects['Avg hrs per day sleeping'],
                "Type of Days": objects['Type of Days'],
                "Age Group": objects ['Age Group'],
                "Sex": objects['Sex']
            }
        })
    await client.close();
    res.status(200).send({
        "status": "OK",
        "message":"Object is updated",
        "object": objects['_id'] //edit
    });
});

//Pass
app.delete('/sleepdata/delete', async (req, res) =>{
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('proj-db').collection('SleepData').deleteOne({ "_id": ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "OK",
        "message": "Object with ID " + id + " is deleted"
    });
});

//Pass
app.get('/sleepdata/search/:searchText', async (req, res) =>{
    const { params } = req;
    const searchText = params.searchText;
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('proj-db').collection('SleepData').find({ $text: {$search: searchText}}).sort({"Date received":-1}).limit(5).toArray();
    const objects = await client.db('proj-db').collection('SleepData').find({ $text: {$search: searchText}}).sort({"Year":1}).toArray();
    await client.close();
    res.status(200).send({
        "status": "OK",
        "searchText": searchText,
        "Complaint":objects
    })
})

//Pass
app.get('/sleepdata/:id', async (req, res) =>{
    const id = req.params.id;
    const client = new MongoClient(uri)
    await client.connect();
    const objects = await client.db("proj-db").collection('SleepData').findOne({ "_id":ObjectId(id)});
    await client.close;
    res.status(200).send({
        "status": "OK",
        "ID": id,
        "Complaint": objects
    })
})



/*  Test Data
    {
		"Year": "Test",
		"Period": "Test",
		"Avg hrs per day sleeping": "8.57",
		"Type of Days": "Test",
		"Age Group": "Test",
		"Sex": "Test"
	}
*/