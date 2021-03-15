const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri =
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.b31bz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
    const homeCollection = client.db(`${process.env.DB_NAME}`).collection("homes");
    const experienceCollection = client.db(`${process.env.DB_NAME}`).collection("experience");

    app.get("/homesData", (req, res) => {
        homeCollection.find({}).toArray((err, data) => {
            res.json(data);
        })
    });
    app.get("/experienceData", (req, res) => {
        experienceCollection.find({}).toArray((err, data) => {
          res.json(data);
        });
    });

    // homeCollection.insertOne();
    // experienceCollection.insertOne();

});

app.listen(process.env.PORT|| 8000)
