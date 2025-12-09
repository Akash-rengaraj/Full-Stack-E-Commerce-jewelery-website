const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// Mock SMS Sender
const sendSMS = async (phoneNumber, otp) => {
    console.log(`[MOCK SMS] Sending OTP ${otp} to ${phoneNumber}`);
    // In production, integrate Twilio or similar here
    return true;
};

// @desc    Register user & send OTP
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    const { name, phoneNumber, password } = req.body;

    try {
        const userExists = await User.findOne({ phoneNumber });

        if (userExists && userExists.isVerified) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (userExists && !userExists.isVerified) {
            // Update existing unverified user
            userExists.name = name;
            userExists.password = hashedPassword;
            userExists.otp = otp;
            userExists.otpExpiry = otpExpiry;
            await userExists.save();
        } else {
            // Create new user
            await User.create({
                name,
                phoneNumber,
                password: hashedPassword,
                otp,
                otpExpiry
            });
        }

        await sendSMS(phoneNumber, otp);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP & Create Account
// @route   POST /api/auth/verify-signup
// @access  Public
const verifySignup = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login & Send 2FA OTP
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate 2FA OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = Date.now() + 10 * 60 * 1000;

            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();

            await sendSMS(phoneNumber, otp);

            res.status(200).json({ message: '2FA OTP sent' });
        } else {
            res.status(401).json({ message: 'Invalid phone number or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Login OTP
// @route   POST /api/auth/verify-login
// @access  Public
const verifyLogin = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signup,
    verifySignup,
    login,
    verifyLogin
};
