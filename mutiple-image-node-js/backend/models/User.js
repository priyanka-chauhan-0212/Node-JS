const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
   
    category:{
        type: String,
        required: true
    },
     images: {
        type: Array,
        required: true
    },
    

})
module.exports = mongoose.model('User', alienSchema)