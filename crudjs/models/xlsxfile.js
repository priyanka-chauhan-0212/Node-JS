const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,

    },
    MobileNo: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('XLSXFile', alienSchema)