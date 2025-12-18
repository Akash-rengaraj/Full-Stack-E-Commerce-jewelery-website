const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all customers (non-admin users)
// @route   GET /api/customers
// @access  Private/Admin
router.get('/', async (req, res) => {
    try {
        // Fetch all users who are not admins (or all users if you prefer)
        // For now, let's fetch all users so admins can see everyone
        const customers = await User.find({ isAdmin: false });

        // Map to match the expected frontend format if needed, or update frontend
        // Frontend expects: name, email (User model doesn't have email yet, only phone), phone, orders, totalSpent, status
        // We'll add virtual fields or defaults for now
        const formattedCustomers = customers.map(user => ({
            id: user._id, // Frontend uses 'id' but MongoDB uses '_id'. We'll map it.
            _id: user._id,
            name: user.name,
            email: user.email || '', // User model might not have email, check schema
            phone: user.phoneNumber,
            password: user.password, // Include hashed password
            orders: 0, // Placeholder until Order model is linked
            totalSpent: 0, // Placeholder
            status: 'Active' // Default status
        }));

        res.json(formattedCustomers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a customer
// @route   POST /api/customers
// @access  Private/Admin
router.post('/', async (req, res) => {
    const { name, email, phone, status } = req.body;

    try {
        const userExists = await User.findOne({ phoneNumber: phone });

        if (userExists) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        // Generate a random password for manually added users
        const password = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            phoneNumber: phone,
            password: hashedPassword,
            isAdmin: false,
            isVerified: true // Admin created users are verified
        });

        res.status(201).json({
            id: user._id,
            _id: user._id,
            name: user.name,
            email: email || '',
            phone: user.phoneNumber,
            orders: 0,
            totalSpent: 0,
            status: 'Active'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.phoneNumber = req.body.phone || user.phoneNumber;
            // user.email = req.body.email || user.email; // If we add email to User model later

            const updatedUser = await user.save();

            res.json({
                id: updatedUser._id,
                _id: updatedUser._id,
                name: updatedUser.name,
                email: req.body.email || '',
                phone: updatedUser.phoneNumber,
                orders: 0,
                totalSpent: 0,
                status: req.body.status || 'Active'
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
