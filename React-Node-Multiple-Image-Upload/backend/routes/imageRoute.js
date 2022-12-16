const express = require("express");
const { upload } = require("../Middleware/image.middleware");

const {
  getImages,
  createImages,
  getCategoryId,
  deleteCategoryId,
  updateCategory,
} = require("../controllers/imageControllers");

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//

// var File = upload.single("File");

router.route("/getImages").get(getImages);
router.route("/createImages").post(upload.array("images"), createImages);
router.route("/getCategoryId").post(getCategoryId);
router.route("/deleteCategoryId").post(deleteCategoryId);
router
  .route("/updateCategory")
  .post(upload.array("multerArray"), updateCategory);

module.exports = router;
