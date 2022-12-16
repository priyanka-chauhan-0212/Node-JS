const express = require("express");
// const jwt = require("jsonwebtoken");

const url = "mongodb://localhost/ImageDB";

const dotenv = require("dotenv");
dotenv.config();

const ImageUpload = require("../models/image");

const path = require("path");
const fs = require("fs");

//get All Category
exports.getImages = async (req, res) => {
  try {
    let images = await ImageUpload.find({});
    if (images.length > 0) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Images Uploaded Successfully..",
        ImageData: images,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Images Upload Error..",
        ImageData: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: 0,
      message: "Error in getting data.",
      error: 1,
      ImageData: [],
    });
  }
};

//Create Category
exports.createImages = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  try {
    const dataUpload = await ImageUpload.create({
      category: req.body.category,
      images: req.files,
    });

    const images = await dataUpload.save();
    // res.json(images);

    if (images) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Images Uploaded Successfully..",
        ImageData: images,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Images Upload Error..",
        ImageData: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: 0,
      message: "Error in getting data.",
      error: 1,
      ImageData: [],
    });
  }
};

//Category By Id
exports.getCategoryId = async (req, res) => {
  try {
    let id = req.body.categoryId;
    // console.log("Id", id);
    const categoryId = await ImageUpload.findById({ _id: id });
    // console.log("CategoryId", categoryId);
    if (categoryId) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Find Category Successfully..",
        ImageData: categoryId,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Not Found..",
        ImageData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in getting data.",
      error: 1,
      ImageData: [],
    });
  }
};

//Delete Category By Id
exports.deleteCategoryId = async (req, res) => {
  try {
    let id = req.body.categoryId;
    // console.log("data", req.body.categoryId);
    const deleteCategory = await ImageUpload.findById({ _id: id });
    console.log("data", deleteCategory);
    deleteCategory.images.map(async (obj) => {
      let path = "./public/" + obj.filename;
      await fs.unlinkSync(path);
    });
    const data = await ImageUpload.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Category Deleted Successfully..",
        ImageData: data,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in Deleting Category..",
        ImageData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in getting one Product.",
      error: 1,
      ImageData: [],
    });
  }
};

// Update Category By Id
exports.updateCategory = async (req, res) => {
  console.log(req.body.multerArray);
  // console.log(req.body.finalArray);
  try {
    let id = req.body.categoryId;
    let imageArray = req.body.imageArray;
    imageArray = JSON.parse(imageArray);
    let multerArray = req.files;
    let finalArray = [];

    imageArray = imageArray.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );

    imageArray && imageArray.map((data) => finalArray.push(data));
    multerArray && multerArray.map((data) => finalArray.push(data));

    const data = await ImageUpload.findByIdAndUpdate(id, {
      category: req.body.categoryName,
      images: finalArray,
    });
    console.log("Data:", data);

    if (data) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Category Updated Successfully..",
        ImageData: data,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in Updating Category..",
        ImageData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in Updating Product.",
      error: 1,
      ImageData: [],
    });
  }
};
