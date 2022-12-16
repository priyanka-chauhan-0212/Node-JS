const Register = require('../models/register')
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

// getAll api code
exports.getAll = async (req, res, next) => {
    try {
        const user = await Register.find({});
        if (user) {
            return res.status(200).json({
                success: 1,
                error: 0,
                data: user,
                message: "success.",
            });
        } else {
            return res.status(200).json({
                success: 0,
                error: 1,
                message: "Error in getting all user.",
            });
        }
    } catch (error) {
        return res.status(200).json({
            success: 0,
            error,
            message: "Error in getting all user.",
        });
    }
}

// create User record api
exports.createUser = async (req, res) => {
    const { firstname, lastname, tech, email, password, mobileNumber } = req.body

    console.log(req.body);
    const hash = await bcrypt.hash(password, 10)

    console.log("hash:", hash);
    const register = new Register({
        firstname: req.body.firstname,

        lastname: req.body.lastname,
        tech: req.body.tech,
        email: req.body.email,
        password: hash,
        mobileNumber: req.body.mobileNumber

    })

    try {
        const a1 = await register.save()
        res.status(200).json(a1)
    } catch (err) {
        // res.send('Error', err)
        res.status(200).json(err)
        console.log(err);
    }
}
// login user api
exports.loginUser = async (req, res, next) => {

    let { email, password } = req.body

    Register.findOne({ email }, async (err, data) => {
        console.log("Data:", data);
        // const matchdata = {
        //     email: req.body.email,
        //     password: req.body.password
        // }
        if (data) {
            const isMatchEmailpassword = await bcrypt.compare(password, data.password);
            console.log("email and password", isMatchEmailpassword)
            if (isMatchEmailpassword) {



                return res.status(200).json({
                    error: 0,
                    success: 1,
                    message: "Login success..",
                    data
                })

            }
            else {
                res.send({ "succes": "wrong password!" });
                // return res.status(200).json({
                //     error: 1,
                //     success: 0,
                //     message: "wrong email and password!",
                //     data
                // })
            }
        } else {
            // res.send({ "succes": "this email and password not match." });
            return res.status(200).json({
                error: 1,
                success: 0,
                message: "this email and password not match.",
                data
            })
        }
    })
}

// change password
exports.resetPswd = async (req, res, next) => {
    let { email, old_password, new_password, cnfm_password } = req.body

    Register.findOne({ email }, async (err, data) => {
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
                    const a5 = await Register.updateOne({ email }, { $set: { password: hash } });
                    // res.send({ "succes": "password is changed" });
                    return res.status(200).json({
                        error: 0,
                        success: 1,
                        message: "password is changed",
                        data
                    })
                }


            }
            else {
                // res.send({ "succes": " old password is wrong !" });
                return res.status(200).json({
                    error: 1,
                    success: 0,
                    message: "old password is wrong !",
                    data: []
                })
            }
        } else {
            // res.send({ "succes": "this email not match." });
            return res.status(200).json({
                error: 1,
                success: 0,
                message: "this email-id is not match...!",
                data: []
            })
        }
    })
}
//forget password send-email
exports.forgetPswd = async (req, res, next) => {
    let { email } = req.body
    // console.log(email);
    Register.findOne({ email }, async (err, data) => {
        // console.log("Data:", data.email);
        if (data) {
            try {

                const token = jwt.sign({ email }, process.env.SECRET_KEY);
                console.log("token", token);
                var transporter = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "3d0365784b7a44",
                        pass: "f474a4ebdfcbe7"
                    }
                });

                const mailOptions = {
                    from: 'priyanaka.v2web@gmail.com',
                    to: data.email,
                    // to: 'priyanaka.v2web@gmail.com',
                    subject: "you tube tutorial",
                    Text: "hello from youtube",
                    html: `<h2>Please click given Reset password</h2>
        <p>${process.env.RESET_URL}/resetpassword/${token}</p>`,

                }
                console.log("mailOptions", mailOptions);
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        // console.log("email has been send", info.response);
                        // res.send({ "succes": "email send..!" });
                        return res.status(200).json({
                            error: 0,
                            success: 1,
                            message: "Reset Password link has been sent Your Email Id...!",
                            data
                        })
                    }
                })
            } catch (err) {
                res.send('Error' + err)
            }
        } else {
            // res.send("email not matched in our data....")
            return res.status(200).json({
                error: 1,
                success: 0,
                message: "email not matched in our data....!",
                data: []
            })
        }
    })
}