const Shop = require("../models/Shop");

// Get all shops
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: shops.length,
      shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get featured shops
exports.getFeaturedShops = async (req, res) => {
  try {
    const shops = await Shop.find({
      featured: true,
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

// Get popular shops
exports.getPopularShops = async (req, res) => {
  try {
    const shops = await Shop.find({
      popular: true,
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

// Get shop by ID
exports.getShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.json({
      success: true,
      shop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};