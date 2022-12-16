const models = require("../../models/index.js");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.createOption = async (req, res) => {
  console.log("Body-----", req.body);
  const user = new Option({
    Answer1: req.body.answer1,
  });

  // const user = req.body;

  try {
    const a1 = await user.save();
    // console.log("reqq", a1);
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
    console.log("error", error);
    return res.status(200).json({
      success: 0,
      message: "Error in creating data.",
      error: 1,
      UserData: [],
    });
  }
};
