const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { admin } = require("../middleware/adminMiddleware")
const router = express.Router();
const { getProducts, getProductById, updateProduct, deleteProduct, createProduct } = require('../controllers/productController.js')

//we imported the multer first which devides the file in to chunks 
const multer = require('multer')

const upload = multer({dest: 'uploads/'})
// it will create the foder in cloudinary name uploads 

// and after that u have a function upload.single which will give you the option to uploa the picture while creating the folder 

// Multer is middleware that processes multipart/form-data requests and makes the uploaded file available to Express.
// if get-->getproducts if post 

router.route('/').get(getProducts).post(protect, admin, upload.any(), createProduct)
router.route('/:id').get(getProductById).put(protect, admin, upload.any(), updateProduct).delete(protect, admin, deleteProduct)
module.exports = router;