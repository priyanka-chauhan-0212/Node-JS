const express = require("express");
const {
    getAll, 
    createUser, 
    postCategoryById, deletedata

} = require("../controller/contoller");
const { upload } = require('../multer-image/multer')

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//

router.route("/getImage").get(getAll);
// router.post("/createImage", upload.array('images'), createUser);
// router.post("/createImage", createUser);
router.route("/createImage").post(upload.array('images'), createUser);
// router.route("/createImage").post(upload.single('image'), createUser);
router.route("/categoryId").post(postCategoryById);
router.route("/deleteCategoryId").post(deletedata);

module.exports = router;
