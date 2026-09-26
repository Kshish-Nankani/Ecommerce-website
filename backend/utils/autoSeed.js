const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Product = require("../model/Product");

const ensureSeeded = async () => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();

    if (userCount === 0 || productCount === 0) {
      console.log("Database empty. Auto-seeding initial data...");

      if (userCount === 0) {
        const rohanPassword = await bcrypt.hash("rohan1234", 10);
        await User.create({
          name: "Rohan Dadwani",
          email: "rohandadwani4@gmail.com",
          password: rohanPassword,
          role: "admin",
          verified: true
        });
        console.log("Admin user rohandadwani4@gmail.com created.");
      }

      if (productCount === 0) {
        await Product.insertMany([
          {
            name: "Wireless Headphones",
            description: "High quality wireless headphones with noise cancellation.",
            price: 8500,
            category: "Electronics",
            stock: 25,
            imageUrl: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
            rating: 4.5,
            numReviews: 120
          },
          {
            name: "Smart Watch",
            description: "Smart watch with fitness tracking and heart rate monitoring.",
            price: 6500,
            category: "Electronics",
            stock: 15,
            imageUrl: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"],
            rating: 4.2,
            numReviews: 85
          },
          {
            name: "Laptop Backpack",
            description: "Water resistant backpack for laptops and everyday use.",
            price: 3500,
            category: "Accessories",
            stock: 40,
            imageUrl: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"],
            rating: 4.7,
            numReviews: 65
          },
          {
            name: "Mechanical Keyboard",
            description: "RGB mechanical keyboard with blue switches.",
            price: 7500,
            category: "Computer Accessories",
            stock: 20,
            imageUrl: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"],
            rating: 4.6,
            numReviews: 95
          },
          {
            name: "Gaming Mouse",
            description: "Ergonomic gaming mouse with adjustable DPI.",
            price: 4200,
            category: "Computer Accessories",
            stock: 30,
            imageUrl: ["https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"],
            rating: 4.4,
            numReviews: 75
          },
          {
            name: "Portable Bluetooth Speaker",
            description: "Compact wireless speaker with rich sound and all-day battery life.",
            price: 4800,
            category: "Electronics",
            stock: 28,
            imageUrl: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"],
            rating: 4.5,
            numReviews: 54
          }
        ]);
        console.log("Initial products seeded.");
      }
    }
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
};

module.exports = ensureSeeded;
