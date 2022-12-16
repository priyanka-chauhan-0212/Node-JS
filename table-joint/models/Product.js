const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    createdById: {
        // type: Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})
module.exports = mongoose.model('Product', alienSchema)