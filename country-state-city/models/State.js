const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
  state_name: {
        type: String,
        required: true
    },
    country_id: {
        // type: Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
    },
})
module.exports = mongoose.model('State', alienSchema)