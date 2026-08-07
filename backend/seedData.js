const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Shop = require("./models/Shop");
const Product = require("./models/Product");
const Category = require("./models/Category");

dotenv.config();

const CATEGORIES = [
  { name: "Rose Bouquets", image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=500&q=80" },
  { name: "Chocolate", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80" },
  { name: "Graduation Gifts", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80" },
  { name: "Birthdays", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
  { name: "Custom Boxes", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80" },
];

const SHOPS = [
  {
    name: "Warda Luxury Boutique",
    address: "Riyadh, Saudi Arabia",
    category: "Flowers & Gifts",
    image: "https://images.unsplash.com/photo-1579738018318-62024de3db89?w=500&q=80",
    description: "Premium flowers and luxury gifts delivered with care.",
    rating: 4.9,
    popular: true,
    featured: true,
    isOpen: true,
    deliveryTime: "45 mins",
    deliveryFee: 0,
  },
];

const PRODUCTS = [
  {
    name: "Red Roses Bouquet",
    price: 85,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&q=80",
    category: "Rose Bouquets",
    description:
      "A signature luxury bouquet of premium Dutch red roses, hand-arranged with lush greenery and elegant velvet wrapping.",
    isPopular: true,
    time: "45 mins",
    rating: 4.9,
    reviews: 1200,
    wrappingColors: ["#E53935", "#F48FB1", "#FFFFFF", "#FFD700", "#4A235A"],
    tags: ["Romantic", "Luxury", "Anniversary", "Fresh Roses"],
  },
  {
    name: "Luxury Chocolate Box",
    price: 120,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80",
    category: "Chocolate",
    description:
      "Handcrafted Belgian artisan chocolates with hazelnut praline, salted caramel, and dark ganache in a velvet jewel box.",
    isPopular: true,
    time: "30 mins",
    rating: 4.8,
    reviews: 890,
    wrappingColors: ["#FFD700", "#4A235A", "#E53935", "#1E1E2D"],
    tags: ["Handmade", "Belgian", "Gourmet"],
  },
  {
    name: "White Roses Bouquet",
    price: 95,
    image: "https://images.unsplash.com/photo-1582782701726-0e5e03a9561f?w=500&q=80",
    category: "Rose Bouquets",
    description:
      "Pristine avalanche white roses symbolizing purity and new beginnings, accented with eucalyptus and satin ribbon.",
    isPopular: true,
    time: "50 mins",
    rating: 4.7,
    reviews: 640,
    wrappingColors: ["#FFFFFF", "#F8BBD9", "#FFD700", "#90CAF9"],
    tags: ["Elegant", "Wedding", "Pure"],
  },
  {
    name: "Joyful Mixed Bouquet",
    price: 110,
    image: "https://images.unsplash.com/photo-1562226210-9752f970dcac?w=500&q=80",
    category: "Rose Bouquets",
    description:
      "A vibrant seasonal symphony of pink peonies, yellow ranunculus, baby roses, and delicate lilies.",
    isPopular: true,
    time: "40 mins",
    rating: 4.9,
    reviews: 1500,
    wrappingColors: ["#F48FB1", "#FFD700", "#FFFFFF", "#E91E63"],
    tags: ["Celebration", "Vibrant", "Birthday"],
  },
  {
    name: "Special Graduation Box",
    price: 150,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
    category: "Graduation Gifts",
    description:
      "Honor milestone achievements with a deluxe gift set featuring a gold-embossed graduation sash, preserved royal roses, and gourmet sweets.",
    isPopular: true,
    time: "60 mins",
    rating: 4.9,
    reviews: 750,
    wrappingColors: ["#4A235A", "#1565C0", "#FFD700", "#1E1E2D"],
    tags: ["Graduation", "Milestone", "Gold Plated"],
  },
  {
    name: "Birthday Party Bouquet",
    price: 130,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500&q=80",
    category: "Birthdays",
    description:
      "The ultimate birthday treat: dazzling pink hydrangeas, pastel roses, a celebratory mini balloon, and a customized greeting card.",
    isPopular: false,
    time: "45 mins",
    rating: 4.8,
    reviews: 980,
    wrappingColors: ["#E91E63", "#FF9800", "#9C27B0", "#FFD700"],
    tags: ["Birthday", "Party", "Balloons"],
  },
  {
    name: "Custom Gift Hamper",
    price: 200,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80",
    category: "Custom Boxes",
    description:
      "A tailored wooden luxury hamper curated with French perfume, a preserved rose dome, luxury candle, and Swiss treats.",
    isPopular: true,
    time: "60 mins",
    rating: 5.0,
    reviews: 420,
    wrappingColors: ["#FFD700", "#E53935", "#4A235A", "#FFFFFF"],
    tags: ["Bespoke", "Luxury Hamper", "VIP"],
  },
  {
    name: "Anniversary Royal Box",
    price: 180,
    image: "https://images.unsplash.com/photo-1518568814500-bf0f8d2f2c2c?w=500&q=80",
    category: "Custom Boxes",
    description:
      "Eternal preserved red roses paired with sparkling cider, heart-shaped chocolates, and a gold-trimmed photo frame.",
    isPopular: false,
    time: "55 mins",
    rating: 4.9,
    reviews: 530,
    wrappingColors: ["#E53935", "#FFD700", "#4A235A"],
    tags: ["Anniversary", "Forever Roses", "Romantic"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Data Seeding...");

    // Seed categories (idempotent)
    for (const cat of CATEGORIES) {
      await Category.findOneAndUpdate(
        { name: cat.name },
        { $set: cat },
        { upsert: true, new: true }
      );
    }

    // Seed shop (idempotent)
    for (const shop of SHOPS) {
      await Shop.findOneAndUpdate(
        { name: shop.name },
        { $set: shop },
        { upsert: true, new: true }
      );
    }

    const wardaShop = await Shop.findOne({ name: "Warda Luxury Boutique" });
    if (!wardaShop) {
      throw new Error("Default shop could not be created");
    }

    // Seed products (idempotent by name)
    for (const product of PRODUCTS) {
      await Product.findOneAndUpdate(
        { name: product.name },
        { $set: { ...product, shop: wardaShop._id } },
        { upsert: true, new: true }
      );
    }

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
