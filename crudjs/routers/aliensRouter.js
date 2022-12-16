const express = require("express");
const {

     getAll, createUser, getUserById, loginUser, sendMail, resetPswd, patchdata, 
    putdata, deletedata, searchdata, sortingdata, pagination, exportcsv

} = require("../controller/controller");
const { upload } = require('../multer-image/multer')

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//


router.route("/getall").get(getAll);
router.route("/create").post(upload.single('image'), createUser);
router.route("/:id").get(getUserById);
router.route("/login").post(loginUser);
router.route("/sendmail").post(sendMail);
router.route("/setpassword").post(resetPswd);
router.route("/:id").patch(patchdata);
router.route("/:id").put(putdata);
router.route("/:id").delete(deletedata);
router.route("/search/:key").get(searchdata);
router.route("/sort/api").get(sortingdata);
router.route("/pagination/api").get(pagination);
router.route("/export/api/csv").post(upload.single('file'),exportcsv);

// router.route("/export/api").post(exportcsv);
module.exports = router;
