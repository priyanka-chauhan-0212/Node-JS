const multer = require('multer')


//multer code -image upload
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './images')
    },
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    }

})

//multer code -csvFIle upload
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './upload');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });


// const upload = multer({
//     storage: storage,
//     limits: {
//         fieldSize: 1024 * 1024 * 3,
//     },

// }).fields(
//     [
//         {
//             name: 'image',
//             maxCount: 1
//         },
//         {
//             name: 'image2',
//             maxCount: 2
//         },
//         {
//             name: 'image3',
//             maxCount: 3
//         }
//     ]
// )

// const upload = multer({ storage: storage })
// const upload = multer({ storage: storage }).any('image');

module.exports = { upload }