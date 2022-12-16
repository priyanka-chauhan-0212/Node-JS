const multer = require('multer')
// const uniqid = require('uniqid');
// const path = require('path');

//multer code -image upload
const storage = multer.diskStorage({
    // destination: function (request, file, callback) {
    //     callback(null, './images')
    // },
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
        // callback(null, Date.now() + uniqid() + path.extname(file.originalname))
    },
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
// const upload = multer({ storage: storage, fileFilter: filefilter });

var upload = multer({
    storage: storage,
    key: function (req, file, cb) {
        cb(null, file.originalname);
    },
    fileFilter: filefilter
});

// console.log("Upload:", upload);
module.exports = { upload }