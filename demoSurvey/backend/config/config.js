require("dotenv").config({ path: "./config.env" });

// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     logging: false,
//     logQueryParameters: false,
//     host: process.env.DB_HOST,
//     dialect: "mariadb",

//   },
//   test: {
//     username: "root",
//     password: null,
//     database: "database_test",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
//   production: {
//     username: "root",
//     password: null,
//     database: "database_production",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
//   // pool: {
//   // 	max: 5,
//   // 	min: 0,
//   // 	acquire: 60000,
//   // 	idle: 30000,
//   //   },
// };

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "surveyPage",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
