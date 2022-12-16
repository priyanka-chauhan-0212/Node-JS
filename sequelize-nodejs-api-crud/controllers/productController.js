const db = require("../models");

const Product = db.products;

//Create Products
const addProduct = async (req, res) => {
  try {
    let info = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };

    const product = await Product.create(info);
    if (product) {
      return res.status(200).json({
        sucess: 1,
        error: 0,
        message: "Register User Successfully ..",
        ProductData: product,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in creating data.",
        ProductData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in creating data.",
      error: 1,
      ProductData: [],
    });
  }
};

// Get all Products
const getAllProducts = async (req, res) => {
  // console.log("helloooo");
  try {
    const products = await Product.findAll({});
    // console.log("Products:", products);
    if (products) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success.",
        ProductData: products,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in getting data",
        ProductData: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: 0,
      message: "Error..",
      error: 1,
      ProductData: [],
    });
  }
};

//Get one Product
const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id: id } });
    if (product) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success.",
        ProductData: product,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in getting one Product.",
        ProductData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in getting one Product.",
      error: 1,
      ProductData: [],
    });
  }
};

//Update Product
const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.update(req.body, { where: { id: id } });
    if (product) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success.",
        ProductData: product,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in updating Product.",
        ProductData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in updating Product.",
      error: 1,
      ProductData: [],
    });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.destroy({ where: { id: id } });
    if (product) {
      return res.status(200).json({
        success: 1,
        error: 0,
        message: "Success.",
        ProductData: product,
      });
    } else {
      return res.status(200).json({
        success: 0,
        error: 1,
        message: "Error in getting one Product.",
        ProductData: [],
      });
    }
  } catch {
    return res.status(200).json({
      success: 0,
      message: "Error in deleting Product.",
      error: 1,
      ProductData: [],
    });
  }
};

//Get Published Product
const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });
  res.status(200).json({
    success: 1,
    message: "Success..",
    error: 0,
    ProductData: products,
  });
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
};
