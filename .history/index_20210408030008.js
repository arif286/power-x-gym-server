const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000
require("dotenv").config();
app.use(cors());
app.use(express.json());


const MongoClient = require("mongodb").MongoClient;

const ObjectId = require("mongodb").ObjectID;

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mnfgc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("powerGym").collection("products");

    app.post('/addEvent', (req, res) => {
        console.log(req.body)
        collection.insertMany(req.body)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    });

    app.get('/events', (req, res) => {
        collection.find()
            .toArray((err, document) => {
                res.send(document)
            })
    });

    app.get('/classDetails/:id', (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, document) => {
                res.send(document[0]);
        })
    })
});




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});