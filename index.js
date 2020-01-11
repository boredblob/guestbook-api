const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Connected to database");
  }
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use("/", authRoute);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server listening on port 7000");
});