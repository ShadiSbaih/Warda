const User = require("../models/User");
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.dashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();

    const shops =
      await Shop.countDocuments();

    const products =
      await Product.countDocuments();

    const orders =
      await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    res.json({
      success: true,
      dashboard: {
        users,
        shops,
        products,
        orders,
        revenue:
          revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};