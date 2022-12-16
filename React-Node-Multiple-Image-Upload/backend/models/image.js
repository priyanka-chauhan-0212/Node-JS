const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  images: {
    type: Array,
  },
});

module.exports = mongoose.model("Images", ImagesSchema);
