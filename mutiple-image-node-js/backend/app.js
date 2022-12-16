const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/tablejoint'
const cors = require('cors');
const app = express()

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection


app.use(cors());

con.on('open', () => {
    console.log('connected...')
})
app.use(express.json())

app.use(express.static("upload"));
//const userRouter = require('./routers/userrouters');
//app.use('/user', userRouter)




app.use((req, res, next) => {
    console.log("HTTP method - " + req.method + ", URL - " + req.url);
    next();
})
app.listen(3010, () => {
    console.log('server started...')
})

const userRouter = require('./routers/userRouter')
app.use('/', userRouter)


