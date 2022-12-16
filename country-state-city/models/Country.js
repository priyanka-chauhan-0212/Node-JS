const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
   country_name: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Country', alienSchema)