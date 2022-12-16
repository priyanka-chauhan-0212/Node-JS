const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    FirstName: {
        type: String,
       
    },
    LastName: {
        type: String,
       
    },
    Email: {
        type: String,
       

    },
    MobileNo: {
        type: String,
       
    },

    Password: {
        type: String,
      
    }
})
module.exports = mongoose.model('CSVFile', alienSchema)