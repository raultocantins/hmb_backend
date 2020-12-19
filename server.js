const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
var connection = mongoose.connect(
  "mongodb+srv://admin:3571592486@cluster0.ebc1x.mongodb.net/hmb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  history: String,
  image: String,
  data: [Object],
});
const History = mongoose.model("History", UserSchema);
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.get("/historys", async (req, res) => {
  const docs = await History.find({}, (err, docs) => {
    var documents = [];
    docs.map((e) => {
      var doc = {};
      doc.history = e.history;
      doc.image = e.image;
      doc._id = e._id;
      documents.push(doc);
    });
    res.json(documents);
  });
});
app.post("/history", async (req, res) => {
  const id = req.body.id;
  console.log();
  const docs = await History.findById(id, (err, doc) => {
    res.json(doc);
  });
});

app.post("/add/history", (req, res) => {
  const data = req.body;
  var history = {
    data: [],
    history: "",
    image: "",
  };
  data.map((e) => {
    if (history.history !== "" && history.image !== "") {
      return;
    } else {
      history.history = e.history;
      history.image = e.capa;
    }
    var block = {
      text: e.text,
      trad: e.trad,
      image: e.image,
    };
    history.data.push(block);
  });
  console.log(history);
  const novo = History.create({
    history: history.history,
    image: history.image,
    data: history.data,
  });
  res.send(novo);
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server on");
});
