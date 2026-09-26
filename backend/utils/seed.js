const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../model/User");
const Product = require("../model/Product");
const Order = require("../model/Order");

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Delete old data
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Old data deleted");

    // =========================
    // HASH PASSWORDS
    // =========================

    const adminPassword = await bcrypt.hash("admin123", 10);
    const rohanPassword = await bcrypt.hash("rohan1234", 10);
    const userPassword = await bcrypt.hash("123456", 10);

    // =========================
    // USERS
    // =========================

    const users = await User.insertMany([
      {
        name: "Rohan Dadwani",
        email: "rohandadwani4@gmail.com",
        password: rohanPassword,
        role: "admin",
        verified: true
      },
      {
        name: "Kashish Nankani",
        email: "kashish@example.com",
        password: userPassword,
        role: "user",
        verified: true
      },
      {
        name: "Ali Khan",
        email: "ali@example.com",
        password: userPassword,
        role: "user",
        verified: true
      },
      {
        name: "Sara Ahmed",
        email: "sara@example.com",
        password: userPassword,
        role: "user",
        verified: true
      }
    ]);

    console.log("Users created");

    // =========================
    // PRODUCTS
    // =========================

    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description:
          "High quality wireless headphones with noise cancellation.",
        price: 8500,
        category: "Electronics",
        stock: 25,
        imageUrl: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.5,
        numReviews: 120
      },
      {
        name: "Smart Watch",
        description:
          "Smart watch with fitness tracking and heart rate monitoring.",
        price: 6500,
        category: "Electronics",
        stock: 15,
        imageUrl: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.2,
        numReviews: 85
      },
      {
        name: "Laptop Backpack",
        description:
          "Water resistant backpack for laptops and everyday use.",
        price: 3500,
        category: "Accessories",
        stock: 40,
        imageUrl: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.7,
        numReviews: 65
      },
      {
        name: "Mechanical Keyboard",
        description:
          "RGB mechanical keyboard with blue switches.",
        price: 7500,
        category: "Computer Accessories",
        stock: 20,
        imageUrl: [
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.6,
        numReviews: 95
      },
      {
        name: "Gaming Mouse",
        description:
          "Ergonomic gaming mouse with adjustable DPI.",
        price: 4200,
        category: "Computer Accessories",
        stock: 30,
        imageUrl: [
          "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.4,
        numReviews: 75
      },
      {
        name: "Portable Bluetooth Speaker",
        description:
          "Compact wireless speaker with rich sound and all-day battery life.",
        price: 4800,
        category: "Electronics",
        stock: 28,
        imageUrl: [
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.5,
        numReviews: 54
      },
      {
        name: "Cotton Hoodie",
        description:
          "Soft everyday hoodie made from comfortable midweight cotton.",
        price: 3200,
        category: "Fashion",
        stock: 35,
        imageUrl: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.3,
        numReviews: 41
      },
      {
        name: "Running Shoes",
        description:
          "Lightweight running shoes with cushioned support for daily training.",
        price: 6200,
        category: "Footwear",
        stock: 18,
        imageUrl: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.6,
        numReviews: 88
      },
      {
        name: "Ceramic Coffee Set",
        description:
          "Minimal ceramic mug and saucer set for a relaxed coffee break.",
        price: 2400,
        category: "Home & Kitchen",
        stock: 22,
        imageUrl: [
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.7,
        numReviews: 33
      },
      {
        name: "Scented Candle Set",
        description:
          "Set of three calming scented candles for a warm home atmosphere.",
        price: 1800,
        category: "Home & Kitchen",
        stock: 45,
        imageUrl: [
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.4,
        numReviews: 29
      },
      {
        name: "Leather Wallet",
        description:
          "Slim genuine leather wallet with space for cards and cash.",
        price: 2700,
        category: "Accessories",
        stock: 26,
        imageUrl: [
          "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.2,
        numReviews: 37
      },
      {
        name: "Stainless Steel Water Bottle",
        description:
          "Insulated reusable bottle that keeps drinks cold or hot for hours.",
        price: 2100,
        category: "Lifestyle",
        stock: 50,
        imageUrl: [
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.5,
        numReviews: 62
      }
    ]);

    console.log("Products created");

    // =========================
    // ORDERS
    // =========================

    await Order.insertMany([
      {
        user: users[1]._id,

        products: [
          {
            product: products[0]._id,
            qut: 1,
            price: products[0].price
          },
          {
            product: products[2]._id,
            qut: 2,
            price: products[2].price
          }
        ],

        totalAmount: 15500,

        address: {
          fullName: "Kashish Nankani",
          street: "Saddar",
          city: "Karachi",
          postalCode: "74000",
          country: "Pakistan"
        },

        paymentId: "PAY-10001",
        status: "pending"
      },

      {
        user: users[2]._id,

        products: [
          {
            product: products[1]._id,
            qut: 1,
            price: products[1].price
          },
          {
            product: products[4]._id,
            qut: 1,
            price: products[4].price
          }
        ],

        totalAmount: 10700,

        address: {
          fullName: "Ali Khan",
          street: "Gulshan-e-Iqbal",
          city: "Karachi",
          postalCode: "75300",
          country: "Pakistan"
        },

        paymentId: "PAY-10002",
        status: "shipped"
      },

      {
        user: users[3]._id,

        products: [
          {
            product: products[3]._id,
            qut: 1,
            price: products[3].price
          }
        ],

        totalAmount: 7500,

        address: {
          fullName: "Sara Ahmed",
          street: "North Nazimabad",
          city: "Karachi",
          postalCode: "74700",
          country: "Pakistan"
        },

        paymentId: "PAY-10003",
        status: "delievered"
      }
    ]);

    console.log("Orders created");

    console.log("================================");
    console.log("DATABASE SEEDED SUCCESSFULLY");
    console.log("Users: 4");
    console.log("Products: 12");
    console.log("Orders: 3");
    console.log("================================");

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
