const User = require('../models/user.model');
const path = require('path');
const fs = require('fs');

// Create new user
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        const user = new User({ fullName, email, password });
        await user.save();
        
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (fullName) user.fullName = fullName;
        if (password) user.password = password;

        await user.save();
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Delete user's image if exists
        if (user.imagePath) {
            const imagePath = path.join(__dirname, '..', user.imagePath);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await User.deleteOne({ email });
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email');
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Upload image
exports.uploadImage = async (req, res) => {
    try {
        const { email } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if user already has an image
        if (user.imagePath) {
            return res.status(400).json({ error: 'Image already exists for this user.' });
        }

        // Validate file format
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.' });
        }

        // Save image path to user
        user.imagePath = file.path;
        await user.save();

        res.status(201).json({
            message: 'Image uploaded successfully.',
            filePath: file.path
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 