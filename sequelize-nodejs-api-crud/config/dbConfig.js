module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "node_sequelize_api_db",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 30000,
  },
};
