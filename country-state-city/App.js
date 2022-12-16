const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/country-state-city'

const app = express()

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})
app.use(express.json())

app.use((req, res, next) => {
    console.log("HTTP method - " + req.method + ", URL - " + req.url);
    next();
})
app.listen(3000, () => {
    console.log('server started...')
})

const Router = require('./routers/CountryStateCity')
app.use('/country', Router)
// console.log(Router);
