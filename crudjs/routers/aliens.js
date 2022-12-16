const bcrypt = require("bcrypt");
const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const SECRET_KEY = "HELLO GOOD MORNING"
// console.log({ password, hash })
const Auth = require('../middlewares/Auth.js')
const { upload } = require('../multer-image/multer')
const { verifyToken } = require("../middlewares/Auth")
var nodemailer = require('nodemailer')
// var { upload } = multer('../multer-image/multer');
// const uploadFiles = upload.array('images', 3)


// //multer code -image upload
// const storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//         callback(null, './images')
//     },
//     filename: function (request, file, callback) {
//         callback(null, file.originalname);
//     },
// });
// const upload = multer({
//     storage: storage,
//     limits: {
//         fieldSize: 1024 * 1024 * 3,
//     },
// })


// get all record api 

router.get('/getall',
    verifyToken,
    async (req, res) => {

        try {
            const aliens = await Alien.find()
            res.json(aliens)
        } catch (err) {
            res.send('Error' + err)
        }
    })


// get record by id api
router.get('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch (err) {
        res.send('Error' + err)
    }
})

// create record api
router.post('/create',
    // upload.single('image'),
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
    async (req, res) => {
        const { email, password } = req.body
        console.log("multiple image====", req.files.image[0].filename);

        // console.log("multiple image====", res);
        console.log(req.body);
        const hash = await bcrypt.hash(password, 10)

        console.log("hash:", hash);
        const alien = new Alien({
            name: req.body.name,
            tech: req.body.tech,
            sub: req.body.sub,
            email: req.body.email,
            password: hash,
            // image: req.file.filename || "",
            image: req.files.image[0].filename,
            image2: req.files.image2[0].filename,
            image3: req.files.image3[0].filename

        })

        try {
            const a1 = await alien.save()
            res.status(200).json(a1)
        } catch (err) {
            // res.send('Error', err)
            res.status(200).json(err)
            console.log(err);
        }
    }
)

// login user api
router.post('/login', async (req, res, next) => {
    let { email, password } = req.body

    Alien.findOne({ email }, async (err, data) => {
        console.log("Data:", data);
        // const matchdata = {
        //     email: req.body.email,
        //     password: req.body.password
        // }
        if (data) {
            const isMatchEmailpassword = await bcrypt.compare(password, data.password);
            console.log("email and password", isMatchEmailpassword)
            if (isMatchEmailpassword) {
                jwt.sign({ email, password }, 'secretkey', (err, token) => {

                    return res.status(200).json({ message: "success", token })

                });
            }


            else {
                res.send({ "succes": "wrong password!" });
            }
        } else {
            res.send({ "succes": "this email and password not match." });
        }
    })
})

//upload send-email
router.post('/sendmail', async (req, res) => {
    let { email } = req.body


    Alien.findOne({ email }, async (err, data) => {
        if (data) {
            try {

                var transporter = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "dacd29e766d8ea",
                        pass: "46358929b0d145"

                    }
                });


                let content = 'your password is ' + data.password
                const mailOptions = {
                    from: 'priyanaka.v2web@gmail.com',
                    to: data.email,
                    // to: 'priyanaka.v2web@gmail.com',
                    subject: "you tube tutorial",
                    Text: "hello from youtube",
                    html: content

                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("email has been send", info.response);
                        res.send({ "succes": "email send..!" });
                    }
                })


            } catch (err) {
                res.send('Error' + err)
            }
        } else {
            res.send("email not matched in our data....")
        }

    })
})

// change password
router.post('/setpassword', async (req, res) => {
    let { email, old_password, new_password, cnfm_password } = req.body

    Alien.findOne({ email }, async (err, data) => {
        console.log("Data:", data);
        if (data) {
            const isMatchpassword = await bcrypt.compare(old_password, data.password);
            console.log("password..........", isMatchpassword)
            if (isMatchpassword) {
                if (new_password == cnfm_password) {
                    // const nwpaswd = new_password
                    console.log("nwpaswd:======", new_password);
                    const hash = await bcrypt.hash(new_password, 10)
                    console.log("hash:======", hash);
                    const a5 = await Alien.updateOne({ email }, { $set: { password: hash } });
                    res.send({ "succes": "password is changed" });
                }


            }
            else {
                res.send({ "succes": " old password is wrong !" });
            }
        } else {
            res.send({ "succes": "this email not match." });
        }
    })

})
//update record by id
router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }
})


//update record by id
router.put("/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        // console.log(alien);
        const a1 = await alien.updateOne({ $set: req.body });
        res.send(a1);
    } catch (err) {
        res.send("Error");
    }
});


//delete record by id
router.delete('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const del = await alien.remove()
        res.json(del)
    } catch (err) {
        res.send('Error')
    }
})

//forget-password
router.post('/forgetpassword', async (req, res) => {
    let { email } = req.body
    Alien.findOne({ email }, async (err, data) => {

        const token = await jwt.sign({ email }, "secret")

        // if (data) {
        //     jwt.sign({ email }, 'SECRET_KEY', (err, token) => {
        //         res.json({
        //             token
        //         });
        //     });
        // }
        console.log("Token...:", token);
        try {
            var transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "dacd29e766d8ea",
                    pass: "46358929b0d145"

                }
            });

            let content = `http://localhost:3000/forgetpassword/${token}`
            const mailOptions = {
                from: 'priyanaka.v2web@gmail.com',
                to: data.email,
                // to: 'priyanaka.v2web@gmail.com',
                subject: "you tube tutorial",
                Text: "hello from youtube",
                html: content

            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("email has been send", info.response);
                    res.send({ "succes": "email send..!" });
                }
            })
        } catch (err) {
            res.send('Error' + err)
        }
    })
})

// reset password
router.post('/resetpassword', async (req, res) => {
    const { email, new_password, cnfm_password } = req.body

    Alien.findOne({ email }, async (err, data) => {
        
        if (data) {
           
                if (new_password == cnfm_password) {
                    // const nwpaswd = new_password
                    console.log("nwpaswd:======", new_password);
                    console.log("cnfm_password:======", cnfm_password);
                    const hash = await bcrypt.hash(new_password, 10)
                    console.log("hash:======", hash);
                    const a5 = await Alien.updateOne({ email }, { $set: { password: hash } });
                    // res.send({ "succes": "password is changed" });
                    if (a5) {
                        return res.status(200).json({
                            success: 1,
                            error: 0,
                            message: "Password updated successfully..",
                        });
                    }
                
            }
                else {

                    // res.send({ "message": "New & confirm Password are not same...!" });
                    return res.status(200).json({
                        success: 0,
                        error: 1,
                        message: "New & confirm Password are not same...!",
                    });
                }
        }
        else {
            res.send({ "message": "user not found" });
        }
    })

})

//search User

module.exports = router










// extra code
// router.post('/login', async (req, res) => {
//     console.log(req.body);
//     const user = {
//         email: 'evani@gmail.com',
//         password: '1234'
//     }
//     try {
//         jwt.sign({ user }, 'SECRET_KEY', (err, token) => {
//             res.json({
//                 token
//             });
//         });
//         // const a1 = await user.save()
//         // res.status(200).json(a1)
//     } catch (err) {
//         // res.send('Error', err)
//         res.status(200).json(err)
//         console.log(err);
//     }
// })



// router.post('/posts', verifyToken, (req, res) => {

//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'post created....', authData
//             });
//         }
//     })

// });