const express = require("express");
const {
    getAll, createUser, loginUser, resetPswd, forgetPswd

} = require("../controller/controller");

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//


router.route("/create").post(createUser);
router.route("/getAll").get(getAll);
router.route("/login").post(loginUser);
router.route("/reset").post(resetPswd);
router.route("/forget").post(forgetPswd);

module.exports = router;
