// const app = require("./app");
// let db = require("./models");

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// });

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "./config/config.env" });
// }

// const server = db.sequelize
//   .sync({ force: false, logging: false })
//   .then((res) => {
//     app.listen(process.env.PORT, async () => {
//       // await db.authenticate();
//       console.log(`Server is working on http://localhost:${process.env.PORT}`);
//     });
//   });

// // * Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled Promise Rejection`);
//   // server.close(() => {
//   //   process.exit(1);
//   // });
// });

const express = require("express");
const cors = require("cors");

const app = express();

// middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const router = require("./routes/user/userRoutes.js");
app.use("/api/", router);

//testing api
app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});
//port

const PORT = process.env.PORT || 8000;

//server

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
