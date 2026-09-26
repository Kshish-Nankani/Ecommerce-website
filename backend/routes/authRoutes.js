const express = require("express")
const {registerUser, loginUser , getUsers} = require("../controllers/authController")
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const {admin} = require("../middleware/adminMiddleware")
const { verifyOTP } = require('../controllers/verifyOTP');

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/users", protect, admin, getUsers)
router.post('/verify-otp', verifyOTP);
module.exports = router;