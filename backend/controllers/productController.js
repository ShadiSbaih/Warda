const Product = require("../models/Product");
const Shop = require("../models/Shop");
const Category = require("../models/Category");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "shop",
      "name image"
    );

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get products by shop
exports.getShopProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      shop: req.params.shopId,
    });

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

// Get products by category
exports.getCategoryProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

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

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new product (Admin Only)
exports.createProduct = async (req, res) => {
  try {
    const { shop, category } = req.body;
    const [shopRecord, categoryRecord] = await Promise.all([
      shop
        ? Shop.findById(shop)
        : Shop.findOne({ featured: true }).sort({ createdAt: 1 }).then((featured) =>
            featured || Shop.findOne().sort({ createdAt: 1 })
          ),
      Category.findOne({ name: category }),
    ]);

    if (!shopRecord) {
      return res.status(400).json({ success: false, message: "Selected shop does not exist" });
    }

    if (!categoryRecord) {
      return res.status(400).json({ success: false, message: "Selected category does not exist" });
    }

    const product = await Product.create({ ...req.body, shop: shopRecord._id });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a product (Admin Only)
exports.updateProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Product not found" });

    const { shop, category } = req.body;
    const [shopRecord, categoryRecord] = await Promise.all([
      shop ? Shop.findById(shop) : Shop.findById(existing.shop),
      category ? Category.findOne({ name: category }) : Category.findOne({ name: existing.category }),
    ]);

    if (!shopRecord) return res.status(400).json({ success: false, message: "Selected shop does not exist" });
    if (!categoryRecord) return res.status(400).json({ success: false, message: "Selected category does not exist" });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, shop: shopRecord._id, category: categoryRecord.name },
      { new: true, runValidators: true }
    ).populate("shop", "name image");

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
