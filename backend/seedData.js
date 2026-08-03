const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Shop = require("./models/Shop");
const Category = require("./models/Category");
dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Data Seeding...");

    await Shop.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing shops, products, and categories.");

    // Create Categories
    const categoriesToCreate = [
      { name: "Rose Bouquets", image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=500&q=80" },
      { name: "Graduation Gifts", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80" },
      { name: "Chocolate", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80" },
      { name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "Perfume", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80" }
    ];
    await Category.insertMany(categoriesToCreate);

    // Create Shops
    const shopsToCreate = [
      {
        name: "Flora Boutique",
        address: "Riyadh, Saudi Arabia",
        rating: 4.9,
        category: "Flowers",
        image: "https://images.unsplash.com/photo-1579738018318-62024de3db89?w=500&q=80",
        isFeatured: true,
      },
      {
        name: "Luxury Gifting",
        address: "Jeddah, Saudi Arabia",
        rating: 4.8,
        category: "Gifts",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80",
        isFeatured: true,
      },
    ];

    const createdShops = await Shop.insertMany(shopsToCreate);
    const shopId1 = createdShops[0]._id;
    const shopId2 = createdShops[1]._id;

    // Create Products
    const productsToCreate = [
      {
        shop: shopId1,
        name: "Red Roses Bouquet",
        price: 85,
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&q=80",
        category: "Rose Bouquets",
        description: "A signature luxury bouquet of premium Dutch red roses.",
        isPopular: true,
        deliveryTime: "45 mins",
      },
      {
        shop: shopId2,
        name: "Luxury Chocolate Box",
        price: 120,
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80",
        category: "Chocolate",
        description: "Handcrafted Belgian artisan chocolates.",
        isPopular: true,
        deliveryTime: "30 mins",
      },
      {
        shop: shopId1,
        name: "White Roses Bouquet",
        price: 95,
        image: "https://images.unsplash.com/photo-1582782701726-0e5e03a9561f?w=500&q=80",
        category: "Rose Bouquets",
        description: "Pristine avalanche white roses symbolizing purity.",
        isPopular: true,
        deliveryTime: "50 mins",
      },
      {
        shop: shopId1,
        name: "Joyful Mixed Bouquet",
        price: 110,
        image: "https://images.unsplash.com/photo-1562226210-9752f970dcac?w=500&q=80",
        category: "Rose Bouquets",
        description: "A vibrant seasonal symphony.",
        isPopular: true,
        deliveryTime: "40 mins",
      },
      {
        shop: shopId2,
        name: "Special Graduation Box",
        price: 150,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
        category: "Graduation Gifts",
        description: "Honor milestone achievements.",
        isPopular: true,
        deliveryTime: "60 mins",
      },
    ];

    await Product.insertMany(productsToCreate);

    console.log("Database seeded with shops and products successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
