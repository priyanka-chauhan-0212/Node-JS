const User = require('../models/User');
const express = require("express");
// const path = require("path");

// getAll api code
exports.getAll = async (req, res) => {
    try {
        let users = await User.find({});
        console.log("User", users);
        if (users) {
            return res.status(200).json({
                success: 1,
                error: 0,
                data: users,
                message: "success.",
            });
        } else {
            return res.status(200).json({
                success: 0,
                error: 1,
                message: "not available getting all user.",
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

// exports.getAll = async (req, res) => {
//     try {
//         let images = await User.find({});
//         images && images.map((i,j) => {
//             console.log("images--", i);
//         })
//         if (images.length > 0) {
//             return res.status(200).json({
//                 success: 1,
//                 error: 0,
//                 message: "Images Uploaded Successfully..",
//                 ImageData: images,
//             });
//         } else {
//             return res.status(200).json({
//                 success: 0,
//                 error: 1,
//                 message: "Images Upload Error..",
//                 ImageData: [],
//             });
//         }
//     } catch (error) {
//         return res.status(200).json({
//             success: 0,
//             message: "Error in getting data.",
//             error: 1,
//             ImageData: [],
//         });
//     }
// };

//create a User

exports.createUser = async (req, res) => {
//    console.log("Body: ",req.files);
 
 
    // const alien = new User({
    //     image: req.files,
    // })

    try {
        const alien = await User.create({
            // fileType: element.mimetype,
            images: req.files,
            category: req.body.category,
        });
        console.log("body", alien);
        const a1 = await alien.save()
        return res.status(200).json({
            success: 1,
            error: 0,
            data: a1,
            message: "create succussfully.",
        });
    } catch (err) {       
        return res.status(200).json({
            success: 0,
            err,
            message: "Error in create user.",
        });
    }
};

//post User by id
exports.postCategoryById = async (req, res, next) => {

    try {
        let id = req.body.id;
        const categoryId = await User.findById({ _id: id });
        return res.status(200).json({
            success: 1,
            error: 0,
            data: categoryId,
            message: "search succussfully",
        });
    } catch (err) {
        return res.status(200).json({
            success: 0,
            err,
            message: "Error in create user.",
        });
    }
}

//delete record by id
exports.deletedata = async (req, res, next) => {
    try {
        let id = req.body.id;
        const categoryId = await User.findById({ _id: id });
        // alien.sub = req.body.sub
        const del = await categoryId.remove()
        return res.status(200).json({
            success: 1,
            error: 0,
            data: del,
            message: "delete succussfully",
        });
    } catch (err) {
        return res.status(200).json({
            success: 0,
            err,
            message: "Error in delete user.",
        });
    }
}