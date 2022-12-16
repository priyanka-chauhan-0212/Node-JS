const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "https://localhost:8081",
};

app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const router = require("./routes/productRouter");
app.use("/api/products", router);

app.get("/", (req, res) => {
  res.json({ message: "Server Started.." });
});

//Port
const PORT = process.env.PORT || 8080;

//Server
app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
