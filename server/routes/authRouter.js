const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")

router.post("/send-otp",authController.generateOtp);
router.post("/verify-otp",authController.verifyOtp);
router.post("/login",authController.login);

module.exports = router;