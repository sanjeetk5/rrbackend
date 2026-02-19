const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Product = require("../models/Product");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected for seeding");

    await User.deleteMany();
    await Product.deleteMany();

    // Create users
    const password = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
      { name: "User One", email: "user1@test.com", password },
      { name: "User Two", email: "user2@test.com", password }
    ]);

    // Create products
    const products = [
      {
        title: "Wireless Headphones",
        price: 1999,
        description: "High quality wireless headphones with deep bass.",
        image: "https://picsum.photos/200?random=1"
      },
      {
        title: "Smart Watch",
        price: 2999,
        description: "Track your health and fitness with this smartwatch.",
        image: "https://picsum.photos/200?random=2"
      },
      {
        title: "Gaming Mouse",
        price: 899,
        description: "RGB gaming mouse with high DPI sensor.",
        image: "https://picsum.photos/200?random=3"
      },
      {
        title: "Laptop Backpack",
        price: 1299,
        description: "Waterproof backpack suitable for laptops.",
        image: "https://picsum.photos/200?random=4"
      },
      {
        title: "Bluetooth Speaker",
        price: 1499,
        description: "Portable speaker with loud sound and bass.",
        image: "https://picsum.photos/200?random=5"
      },
      {
        title: "Shoes",
        price: 1999,
        description: "Comfortable running shoes for daily use.",
        image: "https://picsum.photos/200?random=6"
      },
      {
        title: "Phone Case",
        price: 399,
        description: "Shockproof phone case with stylish design.",
        image: "https://picsum.photos/200?random=7"
      },
      {
        title: "Keyboard",
        price: 1199,
        description: "Mechanical keyboard with smooth typing experience.",
        image: "https://picsum.photos/200?random=8"
      },
      {
        title: "Sunglasses",
        price: 699,
        description: "UV protected stylish sunglasses.",
        image: "https://picsum.photos/200?random=9"
      },
      {
        title: "Water Bottle",
        price: 299,
        description: "Eco-friendly reusable water bottle.",
        image: "https://picsum.photos/200?random=10"
      }
    ];

    await Product.insertMany(products);

    console.log("✅ Seed data inserted successfully!");
    console.log("Users:", users.map((u) => u.email));

    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedData();
