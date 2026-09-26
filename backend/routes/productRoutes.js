const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const router = express.Router();
const { getProducts, getProductById, updateProduct, deleteProduct, createProduct } = require('../controllers/productController.js');
const multer = require('multer');

// Use /tmp/ directory for Vercel serverless compatibility
const upload = multer({ dest: '/tmp/' });

router.route('/').get(getProducts).post(protect, admin, upload.any(), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.any(), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;