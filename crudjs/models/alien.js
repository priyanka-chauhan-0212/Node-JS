const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    sub: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'placeholder.jpg',
    },
    image2: {
        type: String,
        default: 'placeholder.jpg',
    },
    image3: {
        type: String,
        default: 'placeholder.jpg',
    }

})
module.exports = mongoose.model('Alien', alienSchema)