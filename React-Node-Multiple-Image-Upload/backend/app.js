const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const url = "mongodb://localhost/ImageDB";
const path = require("path");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5000/",
    optionsSuccessStatus: 200,
  })
);

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected...");
});

// app.use(express.static(path.resolve(__dirname, "uploads")));

const imageRouter = require("./routes/imageRoute");
app.use("/", imageRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
