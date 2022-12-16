const Alien = require('../models/alien')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer')
var excelToJson = require('convert-excel-to-json');
var bodyParser = require('body-parser');
// var XLSX = require("xlsx");
const CSVFile = require("../models/csvfile");
const XLSXFile = require("../models/xlsxfile");
const csv = require("csvtojson");
const path = require("path");
const { log } = require('console');

// getAll api code
exports.getAll = async (req, res, next) => {
    try {
        const user = await Alien.find({});
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
//create a User
exports.createUser = async (req, res, next) => {
    const { email, password } = req.body

    console.log(req.body);
    const hash = await bcrypt.hash(password, 10)

    console.log("hash:", hash);
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub,
        email: req.body.email,
        password: hash,
        // image: req.file.filename || ""
    })

    try {
        const a1 = await alien.save()
        res.status(200).json(a1)
    } catch (err) {
        // res.send('Error', err)
        res.status(200).json(err)
        console.log(err);
    }
};
//get User by id
exports.getUserById = async (req, res, next) => {
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch (err) {
        res.send('Error' + err)
    }
}
// login user api
exports.loginUser = async (req, res, next) => {

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
}

//upload send-email
exports.sendMail = async (req, res, next) => {

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
}

// change password
exports.resetPswd = async (req, res, next) => {
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
}

//update record by id
exports.patchdata = async (req, res, next) => {
    try {
        // const alien = await Alien.findById(req.params.id)
        // alien.sub = req.body.sub
        const a5 = await Alien.updateOne({ email: req.body.email }, { $set: req.body });
        // const a1 = await alien.save()
        res.json(a5)
    } catch (err) {
        console.log(err);
        res.send('Error')
    }
}

//update record by id
exports.putdata = async (req, res, next) => {
    try {
        const alien = await Alien.findById(req.params.id);
        // console.log(alien);
        const a1 = await alien.updateOne({ $set: req.body });
        res.send(a1);
    } catch (err) {
        res.send("Error");
    }
}

//delete record by id
exports.deletedata = async (req, res, next) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const del = await alien.remove()
        res.json(del)
    } catch (err) {
        res.send('Error')
    }
}

//search User
exports.searchdata = async (req, res) => {
    console.log("Search========", req.params.key);


    try {
        //single field
        let data = await Alien.find(
            {
                name: { $regex: req.params.key }
            });

        //multiple field
        // let data = await Alien.find(
        //     {
        //         "$or": [{ name: { $regex: req.params.key } }, { tech: { $regex: req.params.key } }
        //         ]
        //     });

        console.log("Searchdata", data);

        if (data.length) {

            return res.status(200).json({
                succes: 1,
                error: 0,
                message: "available...",
                UserData: data,
            })
        }
        else {
            return res.status(200).json({
                succes: 0,
                error: 1,
                message: "Not available...",
                UserData: [],
            })
        }
    }
    catch (error) {
        res.send('Error')
    }

}

//sorting User
exports.sortingdata = async (req, res) => {

    console.log("call");
    try {

        let data = await Alien.find({}).sort({ name: 1 });
        console.log("Data", data);
        if (data) {

            return res.status(200).json({
                succes: 1,
                error: 0,
                message: "available...",
                UserData: data,
            })
        }
        else {
            return res.status(200).json({
                succes: 0,
                error: 1,
                message: "Wrong...",
                UserData: [],
            })
        }
    }
    catch (error) {
        console.log(error);
        res.send('Error')
    }

}

//pagination 
exports.pagination = async (req, res) => {

    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}

    console.log("hiiiii", pageNo, size);
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    Alien.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "error": false, "message": data };
        }
        res.json(response);
    });
}

//exportCSV File

exports.exportcsv = async (req, res) => {
    console.log("hello", req.file);

    // function importExcelData2MongoDB(filePath) {
    //     // -> Read Excel File to Json Data
    //     const excelData = excelToJson({
    //         sourceFile: filePath,
    //         sheets: [{
    //             // Excel Sheet Name
    //             name: 'Customers',
    //             // Header Row -> be skipped and will not be present at our result object.
    //             header: {
    //                 rows: 1
    //             },
    //             // Mapping columns to keys
    //             columnToKey: {
    //                 A: '_id',
    //                 B: 'firstName',
    //                 C: 'lastName',
    //                 D: 'email',
    //                 E: 'phoneNumber',
    //                 F: 'createdAt'
    //             }
    //         }]
    //     });
    //     // -> Log Excel Data to Console
    //     console.log("excel here", excelData);
    // }

    // try {
    //     // console.log("Data===pathforexcel>", pathforexcel);

    //     //    let data = importExcelData2MongoDB(pathforexcel);
    //     //    res.send({ "succes": "excel upload..!" });

    //     // const fileLocation = req.file.path;
    //     //  console.log(fileLocation); // logs uploads/file-1541675389394.xls
     
    //     let pathforexcel = "./upload/" + req.file.filename


    //     var workbook = XLSX.readFile(pathforexcel);
    //     var sheet_name_list = workbook.SheetNames;
    //     let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    //     // Insert Json-Object to MongoDB
    //     await Alien.insertMany(jsonData);
       

    //     return res.json({
    //         json: jsonData
    //     });
    // } catch (error) {
    //     // console.log(error);
    //     res.send({ "not sucess": "something wrong" })
    // }




    // xlse-csv file code
    const pathFile = "./upload/" + req.file.filename;

    const pathExt = path.extname(pathFile);
    console.log("File Extension : ", pathExt);

    if (pathExt === ".csv") {
        try {
            csv()
                .fromFile(req.file.path)
                .then((jsonObj) => {
                    console.log("Fileeee:", jsonObj);

                    var arrayToInsert = [];
                    for (var i = 0; i < jsonObj.length; i++) {
                        var oneRow = {
                            FirstName: jsonObj[i]["FirstName"],
                            LastName: jsonObj[i]["LastName"],
                            Email: jsonObj[i]["Email"],
                            MobileNo: jsonObj[i]["MobileNo"],
                            Password: jsonObj[i]["Password"],
                        };
                        arrayToInsert.push(oneRow);
                    }

                    const data = CSVFile.insertMany(arrayToInsert, (err, result) => {
                        console.log("result", result);
                        if (err) {
                            console.log("err",err);
                            return res.status(200).json({
                                success: 0,
                                error: 1,
                                message: "Error..",
                                UserData: [],
                            });
                        }
                        if (result) {

                            return res.status(200).json({
                                success: 1,
                                error: 0,
                                message: "CSV File Uploaded Successfully..",
                                UserData: result,
                            });
                        }
                    });
                });
        } catch(error) {
            console.log("error", error);
            return res.status(400).send("Something went wrong. Try again");
        }
    } else if (pathExt === ".xlsx") {
        try {
            const excelData = await excelToJson({
                sourceFile: pathFile,
                header: {
                    rows: 1,
                },
                columnToKey: {
                    A: "FirstName",
                    B: "LastName",
                    C: "Email",
                    D: "MobileNo",
                    E: "Password",
                   
                },
            });
            // console.log("ExcelData:", excelData);

            XLSXFile.insertMany(excelData.Worksheet, (err, data) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        error: 1,
                        message: "Error..",
                        UserData: [],
                    });
                } else {
                    return res.status(200).json({
                        success: 1,
                        error: 0,
                        message: "XLSX File Uploaded Successfully..",
                        UserData: data,
                    });
                }
            });
        } catch {
            return res
                .status(400)
                .json({ message: "Something went wrong. Try again" });
        }
    } else {
        return res
            .status(400)
            .json({ message: pathExt + " File extension not Valid.." });
    }
}
