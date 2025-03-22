const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Create new user
exports.createUser = async (req, res) => {
  try {
    console.log('Creating user with data:', req.body);
    const { fullName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ error: "Email already exists." });
    }

    const user = new User({ fullName, email, password });
    await user.save();
    console.log('User created successfully:', user);
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(400).json({ error: error.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (fullName) user.fullName = fullName;
    if (password) user.password = password;

    await user.save();
    res.status(200).json({ message: "User updated successfully." });
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
      return res.status(404).json({ error: "User not found." });
    }

    // Delete user's image if exists
    if (user.imagePath) {
      const imagePath = path.join(__dirname, '..', user.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await User.deleteOne({ email });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.imagePath) {
      return res.status(400).json({ error: "Image already exists for this user." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    user.imagePath = req.file.path;
    await user.save();

    res.status(201).json({
      message: "Image uploaded successfully.",
      filePath: req.file.path
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
