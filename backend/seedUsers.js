const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

// Load env vars
dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding...");

    // Remove existing test users to prevent duplicate key errors
    await User.deleteMany({ email: { $in: ["admin@warda.app", "user@warda.app", "delivery@warda.app"] } });

    const hashedPassword = await bcrypt.hash("password123", 10);

    const usersToCreate = [
      {
        name: "Admin User",
        email: "admin@warda.app",
        password: hashedPassword,
        phone: "+966500000001",
        role: "admin",
        isVerified: true,
      },
      {
        name: "Normal User",
        email: "user@warda.app",
        password: hashedPassword,
        phone: "+966500000002",
        role: "user",
        isVerified: true,
      },
      {
        name: "Delivery Driver",
        email: "delivery@warda.app",
        password: hashedPassword,
        phone: "+966500000003",
        role: "delivery",
        isVerified: true,
      },
    ];

    await User.insertMany(usersToCreate);

    console.log("Database seeded successfully with admin, user, and delivery roles!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedUsers();
