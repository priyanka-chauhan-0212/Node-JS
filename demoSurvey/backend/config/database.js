const mariadb = require('mariadb');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	dialect: 'mariadb',
	dialectOptions: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		connectionLimit: 5,
	},
});

// const pool = mariadb.createPool({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// 	connectionLimit: 5,
// });

// pool.getConnection((err, connection) => {
// 	if (err) {
// 		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
// 			console.error('DATABASE CONNECTION LOST');
// 		}
// 		if (err.code === 'ER_CON_COUNT_ERRORT') {
// 			console.error('DATABASE HAS TOO MANY CONNECTION');
// 		}
// 		if (err.code === 'ECONNREFUSED') {
// 			console.error('DATABASE CONNECTION WAS REFUSED');
// 		}
// 	}
// 	if (connection) connection.release();

// 	return;
// });
module.exports = sequelize;
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false && npm install --prefix frontend && npm run build --prefix frontend"
