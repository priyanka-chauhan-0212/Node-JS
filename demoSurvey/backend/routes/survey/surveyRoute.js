const express = require("express");

const {
  // getOption,
  createOption,
} = require("../../controllers/survey/surveyController");

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//

// router.route("/getOption").get(getOption);
router.route("/createOption").post(createOption);

module.exports = router;
