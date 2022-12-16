const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/tablejoint'

const app = express()

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})
app.use(express.json())

//const userRouter = require('./routers/userrouters');
//app.use('/user', userRouter)


app.use((req, res, next) => {
    console.log("HTTP method - " + req.method + ", URL - " + req.url);
    next();
})
app.listen(3000, () => {
    console.log('server started...')
})

const userRouter = require('./routers/userrouters') 
app.use('/user', userRouter) 

const productRouter = require('./routers/productrouters')
app.use('/product', productRouter) 