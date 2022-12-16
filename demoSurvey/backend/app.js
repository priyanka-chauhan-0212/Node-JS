// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const logger = require("morgan");
// require("dotenv").config({ path: "./config/config.env" });
// const sequelize = require("./models");
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
// // const hbs = require('express-handlebars');
// const { engine } = require("express-handlebars");
// let cors = require("cors");

// const app = express();

// // view engine setup

// // handlebars.registerHelper('setVar', function (varName, varValue, options) {
// // 	options.data.root[varName] = varValue;
// // });

// app.engine(
//   "handlebars",
//   engine({
//     extName: ".handlebars",
//     allowProtoMethodsByDefault: true,
//     allowedProtoProperties: true,
//     defaultLayout: false,
//     helpers: {
//       if_eq: function (a, b, opts) {
//         if (a == b)
//           // Or === depending on your needs
//           return opts.fn(this);
//         else return opts.inverse(this);
//       },
//       setVar: function (varName, varValue, options) {
//         options.data.root[varName] = varValue;
//       },
//       times: function (n, block) {
//         var accum = "";
//         for (var i = 0; i <= n; ++i) accum += i;
//         return accum;
//       },
//     },

//     viewPath: path.resolve("./templates"),
//     estName: ".handlebars",
//   })
// );
// app.set("view engine", "handlebars");
// app.set("views", "./templates");

// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');
// // app.set('view engine', 'hbs');

// // app.engine(
// // 	'hbs',
// // 	hbs.engine({
// // 		extName: '.handlebars',
// // 		partialsDir: path.resolve('./templates'),
// // 		defaultLayout: false,
// // 		helpers: {
// // 			if_eq: function (a, b, opts) {
// // 				if (a == b)
// // 					// Or === depending on your needs
// // 					return opts.fn(this);
// // 				else return opts.inverse(this);
// // 			},
// // 		},

// // 		viewPath: path.resolve('./templates'),
// // 		estName: '.handlebars',
// // 	})
// // );

// let options = {
//   origin: "*",
//   credentials: true,
// };

// app.use(
//   cors({
//     origin: [
//       "https://tep-nps.netlify.app",
//       "http://localhost:3000",
//       "https://tep-nps-netlify.netlify.app",
//       "*",
//       "null",
//     ],

//     credentials: true,
//   })
// );
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "build")));
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// app.use(express.static("uploads"));
// // app.engine('html', require('ejs').renderFile);
// // app.set('view engine', 'html');
// // app.set('view engine', 'ejs');

// //----- uncomment below code if want to run node and react on same server -------------

// // app.get('/', (req, res) => {
// // 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// // });

// // app.get('/*', (req, res) => {
// // 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// // });
// //---------------------------------------------------------------------------------------

// //Route Imports
// // const surveyRoutes = require('./routes/survey/surveyRoutes');
// // const surveyResponseRoutes = require('./routes/surveyResponse/surveyResponseRoutes');
// // const getDashboardDetailsRoutes = require('./routes/dashboard/dashboardRoutes');
// // const getReportRoutes = require('./routes/reports/reportRoutes');
// // const sendSurveyEmailRoutes = require('./routes/surveyEmail/surveyEmailRoutes');
// const userRoutes = require("./routes/user/userRoutes");
// const surveyRoutes = require("./routes/survey/surveyRoute");
// // const accountGrowth = require('./routes/AccountGrowth/AccountGrowth');

// // Path for Api
// app.use("/api/v1", userRoutes); //all user related api=
// app.use("/api/v1", surveyRoutes); //all survey related api
// // app.use('/api/v1', surveyResponseRoutes); //all survey response related api
// // app.use('/api/v1', getDashboardDetailsRoutes); //all deshboard related api
// // app.use('/api/v1', getReportRoutes); //all reports related api
// // app.use('/api/v1', sendSurveyEmailRoutes); //all survey email related api
// // app.use('/api/v1', accountGrowth); //all account growth related api

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// // app.listen({ port: process.env.PORT || 5000 }, async () => {
// // 	console.log('server listening on port 5000');
// // 	await sequelize.authenticate();
// // 	console.log('database connected!');
// // });

// module.exports = app;
