const express = require("express");
const jwt = require("jsonwebtoken");

// const mongoose = require("mongoose");
// const mongodb = require("mongodb");
const url = "mongodb://localhost/LoginDB";

const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

const User = require("../models/register");

const CSVFile = require("../models/csvfile");
const XLSXFile = require("../models/xlsxfile");
const csv = require("csvtojson");
var excelToJson = require("convert-excel-to-json");
const path = require("path");

exports.getAllRegisterUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success.",
        UserData: users,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in getting data.",
        UserData: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: 0,
      message: "Error in getting data.",
      error: 1,
      UserData: [],
    });
  }
};

exports.createRegisterUser = async (req, res) => {
  let { password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Email: req.body.email,
    MobileNo: req.body.mobileNo,
    Password: hash,
    token: req.body.token,
  });

  try {
    const a1 = await user.save();
    if (a1) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Register User Successfully ..",
        UserData: a1,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in creating data.",
        UserData: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: 0,
      message: "Error in creating data.",
      error: 1,
      UserData: [],
    });
  }
};

exports.deleteRegisterUser = async (req, res) => {
  console.log("body", req.body);
  try {
    const users = await User.findById(req.params.id);
    // console.log(alien);
    const a1 = await users.deleteOne();
    if (a1) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success.",
        UserData: users,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in deleting data.",
        UserData: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: 0,
      message: "Error in deleting data.",
      error: 1,
      UserData: [],
    });
  }
};

exports.loginRegisterUser = async (req, res) => {
  // console.log(req.body);

  let { email, password } = req.body;

  User.findOne({ email }, async function (err, data) {
    console.log(data);
    if (data) {
      jwt.sign(
        { email, password },
        process.env.SECRET_KEY, //   { expiresIn: "30s" },
        (err, token) => {
          return res.json({
            message: "Successful User Login ..",
            data,
            token,
          });
        }
      );
      // res.send({ Success: "Success!" });
    } else {
      return res.send({ Success: "Email Wrong!" });
    }
  });
};

//forgot Password generate token
exports.forgotPassword = async (req, res) => {
  // console.log(req.body);

  try {
    let { email } = req.body;

    User.findOne({ email }, async function (err, data) {
      console.log("Data:", data);
      // if (data) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);

      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c300e6891d7346",
          pass: "b58782edf732e9",
        },
      });

      const mailOptions = {
        from: "ewani.v2web@gmail.com",
        to: data.Email,
        subject: "Nodemailer",
        html: `
        <h2>Please click given Reset password</h2>
        <p>${process.env.RESET_URL}/resetPassword/${token}</p>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email Send:", info.response);
        }
      });

      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Reset Password link has been sent Your Email Id..",
      });
    });
  } catch {
    return res.status(200).json({
      success: 0,
      error: 1,
      message: "Please enter valid Email Id..",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, new_password, confirm_password } = req.body;
    // console.log("Body:", req.body);
    User.findOne({ email }, async function (err, data) {
      if (data) {
        if (new_password === confirm_password) {
          const newpsw = new_password;
          const hashedPassword = await bcrypt.hash(newpsw, 10);
          console.log("New Password:", hashedPassword);
          console.log("New Compare:", newpsw);
          const a1 = await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
          );

          if (a1) {
            return res.status(200).json({
              success: 1,
              error: 0,
              message: "Password updated successfully..",
            });
          }
        } else {
          return res.status(200).json({
            success: 0,
            error: 1,
            message: "Please enter same new & confirm Password..",
          });
        }
        // console.log("Compare:", isValidPassword);
      }
      res.send("Enter valid Old Password");
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).send("Something went wrong. Try again");
  }
};

//Search User
exports.search = async (req, res) => {
  // console.log(req.params.key);
  try {
    let data = await User.find({
      $or: [
        { FirstName: { $regex: req.params.key } },
        { LastName: { $regex: req.params.key } },
      ],
    });
    if (data) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success..",
        UserData: data,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error..",
        UserData: [],
      });
    }
  } catch {
    return res.status(400).send("Something went wrong. Try again");
  }
};

//Paginate
exports.paginate = async (req, res) => {
  try {
    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 2;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const users = await User.find().limit(limit).skip(skip);
    if (users) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success..",
        page,
        size,
        UserData: users,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error..",
        UserData: [],
      });
    }
  } catch {
    return res.status(400).send("Something went wrong. Try again");
  }
};

//Sorting
exports.sorting = async (req, res) => {
  // console.log("Body:", req.body);
  try {
    const users = await User.find({}).sort({ FirstName: -1 });
    console.log("Users:", users);
    if (users) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success..",
        UserData: users,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error..",
        UserData: [],
      });
    }
  } catch {
    return res.status(400).send("Something went wrong. Try again");
  }
};

exports.uploadCsv = async (req, res) => {
  // console.log("File:", req.file);
  try {
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        // console.log("Fileeee:", jsonObj);

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
          if (err) {
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
              message: "Success..",
              UserData: result,
            });
          }
        });
      });
  } catch {
    return res.status(400).send("Something went wrong. Try again");
  }
};

exports.uploadXlsx = async (req, res) => {
  console.log("File:", req.file);
  const pathFile = "./uploads/" + req.file.filename;
  // const ext = path.extname(path);
  // console.log(ext);
  console.log("ext name : " + path.extname(pathFile));
  // const PathFormat = path.format({
  //   ext: ".xlsx",
  // });
  // console.log("Path:", PathFormat);
  try {
    const excelData = await excelToJson({
      sourceFile: pathFile,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "FirstName",
        B: "LastName",
        C: "age",
        D: "Email",
        E: "MobileNo",
        F: "Password",
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
          message: "Success..",
          UserData: data,
        });
      }
    });
  } catch {
    return res
      .status(400)
      .json({ message: "Something went wrong. Try again", err });
  }
};

exports.uploadFile = async (req, res) => {
  console.log("File:", req.file);
  const pathFile = "./uploads/" + req.file.filename;

  const pathExt = path.extname(pathFile);
  console.log("File Extension : ", pathExt);

  if (pathExt === ".csv") {
    try {
      csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
          // console.log("Fileeee:", jsonObj);

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
            if (err) {
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
    } catch {
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
          C: "age",
          D: "Email",
          E: "MobileNo",
          F: "Password",
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
};
