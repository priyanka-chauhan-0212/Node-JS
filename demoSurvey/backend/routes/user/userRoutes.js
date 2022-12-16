// const express = require("express");

// const {
//   createUser,
//   loginUser,
//   getUserProfile,
//   updateUser,
//   changePassword,
//   forgetPasswordSendEmail,
//   resetPassword,
//   // updateUserOverviewLayout,
//   logoutUser,
//   updateUserSettings,
// } = require("../../controllers/user/userController");
// const router = express.Router();
// const { check } = require("express-validator");
// const { upload } = require("../../middleware/multer-middleware");
// const { isLoggedInUser } = require("../../middleware/loginCheck");

// //--------------------- Routes with login --------------------------

// router.route("/updateUser").post(
//   isLoggedInUser,
//   upload.fields([
//     { name: "profile_pic", maxCount: 1 },
//     { name: "brand_logo", maxCount: 1 },
//   ]),
//   updateUser
// );
// // router.route('/saveLayout').post(isLoggedInUser, updateUserOverviewLayout);
// router.route("/updateUserSettings").post(isLoggedInUser, updateUserSettings);
// router.route("/changePassword").post(isLoggedInUser, changePassword);
// router.route("/getUserProfile").post(isLoggedInUser, getUserProfile);

// //--------------------------------------------------------------------

// //--------------------- Routes without login --------------------------
// router.route("/createUser").post(
//   upload.fields([
//     { name: "profile_pic", maxCount: 1 },
//     { name: "brand_logo", maxCount: 1 },
//   ]),
//   createUser
// );

// router.route("/loginUser").post(loginUser);
// router.route("/logoutUser").post(logoutUser);
// router.route("/forgetPasswordSendEmail").post(forgetPasswordSendEmail);
// router.route("/resetPassword").post(resetPassword);

// //------------------------------------------------------------------

// module.exports = router;

// import controllers review, products
const RegisterController = require("../../controllers/user/userController");

// router
const router = require("express").Router();

// use routers
router.post("/addUser", RegisterController.addUser);

// router.get('/allProducts', RegisterController.getAllProducts)

// router.get('/published', RegisterController.getPublishedProduct)

module.exports = router;
