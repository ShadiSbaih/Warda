const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    await category.deleteOne();
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOccasions = async (req, res) => {
  try {
    const occasions = await Product.distinct("occasion");
    res.json({
      success: true,
      count: occasions.length,
      occasions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
