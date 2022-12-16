const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    city_name: {
        type: String,
        required: true
    },
    state_id: {
        // type: Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
    },
})
module.exports = mongoose.model('City', alienSchema)