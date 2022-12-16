const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

//static Images Folder

app.use('/Images', express.static('./Images'))


//testing api
app.get('/',(req,res)=>{
    res.json({message:"hello from api"})
})
//port

const PORT = process.env.PORT || 3000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})