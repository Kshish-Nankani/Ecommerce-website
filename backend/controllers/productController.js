const Product = require('../model/Product');
const cloudinary = require("../config/cloudinary");
const fs = require('fs');

// Helper to upload files to Cloudinary and clean up local temp files
const uploadFilesToCloudinary = async (files) => {
  if (!files || files.length === 0) return [];
  
  const uploadPromises = files.map(async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products'
      });
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return result.secure_url;
    } catch (error) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  });

  return await Promise.all(uploadPromises);
};

// getProducts
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1, _id: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = ['/images/logo.jpg'];

    const files = req.files || (req.file ? [req.file] : []);
    if (files.length > 0) {
      const uploadedUrls = await uploadFilesToCloudinary(files);
      if (uploadedUrls.length > 0) {
        imageUrl = uploadedUrls;
      }
    } else if (req.body.imageUrl) {
      if (Array.isArray(req.body.imageUrl)) {
        imageUrl = req.body.imageUrl;
      } else if (typeof req.body.imageUrl === 'string') {
        try {
          const parsed = JSON.parse(req.body.imageUrl);
          imageUrl = Array.isArray(parsed) ? parsed : [req.body.imageUrl];
        } catch (e) {
          imageUrl = [req.body.imageUrl];
        }
      }
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error);
    res.status(400).json({ message: error.message || 'Unable to create product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, existingImages } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;

      let keptImages = [];
      if (existingImages !== undefined) {
        try {
          keptImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
          if (!Array.isArray(keptImages)) keptImages = [keptImages];
        } catch (e) {
          keptImages = [];
        }
      }

      const files = req.files || (req.file ? [req.file] : []);
      if (files.length > 0) {
        const newUploadedUrls = await uploadFilesToCloudinary(files);
        if (existingImages !== undefined) {
          product.imageUrl = [...keptImages, ...newUploadedUrls];
        } else {
          product.imageUrl = newUploadedUrls;
        }
      } else if (existingImages !== undefined) {
        product.imageUrl = keptImages.length > 0 ? keptImages : ['/images/logo.jpg'];
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }

  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: 'server error',
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'product remove' });
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};