const User = require('../model/User');

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.verified = true;
        user.otp = undefined;

        await user.save();

        res.json({
            message: "OTP verified successfully",
            isVerified: user.verified
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { verifyOTP };


