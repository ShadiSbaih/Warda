const Product = require("../models/Product");

// Get all distinct categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all distinct occasions
exports.getOccasions = async (req, res) => {
  try {
    const occasions = await Product.distinct("occasion");

    res.json({
      success: true,
      count: occasions.length,
      occasions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
