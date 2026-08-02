const Shop = require("../models/Shop");
const Product = require("../models/Product");

// Global Search
exports.search = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const shops = await Shop.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    const products = await Product.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    }).populate("shop", "name");

    res.json({
      success: true,
      shops,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Shops Only
exports.searchShops = async (
  req,
  res
) => {
  try {
    const shops = await Shop.find({
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    });

    res.json({
      success: true,
      shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Products Only
exports.searchProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }).populate("shop", "name");

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};