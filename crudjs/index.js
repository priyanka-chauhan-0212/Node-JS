const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlienDBex'
var path = require('path');

const index = express()
const cors = require("cors");
index.use(cors());

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})
index.use(express.json())

//const alienRouter = require('./routers/aliens')
//index.use('/aliens', alienRouter)

index.use((req, res, next) => {
    console.log("HTTP method - " + req.method + ", URL - " + req.url);
    next();
})
index.listen(3010, () => {
    console.log('server started...')
})

//static folder  
index.use(express.static(path.resolve(__dirname, 'upload')));  

const user = require("./routers/aliensRouter");
index.use('/aliens', user);