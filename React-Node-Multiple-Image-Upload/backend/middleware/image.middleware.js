const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/");
  },
  filename: (req, file, callback) => {
    // console.log("File Name:", file.originalname);
    callback(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
  // fileFilter: csvFilter
});
// console.log("Upload:", upload);
module.exports = { upload };
