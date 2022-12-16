const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/final'
var path = require('path');

const cors = require("cors")

const App = express()
// const cors = require("cors");
App.use(cors());

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})
App.use(express.json())

const Router = require('./routers/registerRouter')
App.use('/demo', Router)

App.use((req, res, next) => {
    console.log("HTTP method - " + req.method + ", URL - " + req.url);
    next();
})

App.listen(5000, () => {
    console.log('server started...')
})
