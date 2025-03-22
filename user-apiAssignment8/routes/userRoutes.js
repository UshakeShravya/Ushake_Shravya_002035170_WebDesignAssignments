const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           description: User's full name (alphabetic characters only)
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: User's password (min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)
 *           example: "StrongP@ss123"
 *         imagePath:
 *           type: string
 *           description: Path to user's profile image
 *           example: "uploads/image-1234567890.jpg"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Email already exists"
 *     Success:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *           example: "User created successfully"
 */

// Add request logging middleware for user routes
router.use((req, res, next) => {
  console.log('User Route Request:', {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers
  });
  next();
});

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Creates a new user with the provided details. Validates email format, name format, and password strength.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             fullName: "John Doe"
 *             email: "john.doe@example.com"
 *             password: "StrongP@ss123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidEmail:
 *                 value:
 *                   error: "Please enter a valid email address"
 *               invalidName:
 *                 value:
 *                   error: "Full name can only contain alphabetic characters"
 *               invalidPassword:
 *                 value:
 *                   error: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
 *               duplicateEmail:
 *                 value:
 *                   error: "Email already exists"
 */
router.post('/create', async (req, res, next) => {
  try {
    console.log('Create User Request Body:', req.body);
    await userController.createUser(req, res);
  } catch (error) {
    console.error('Create User Error:', error);
    next(error);
  }
});

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     description: Updates an existing user's details. Email cannot be changed.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address (used to identify the user)
 *                 example: "john.doe@example.com"
 *               fullName:
 *                 type: string
 *                 description: New full name (alphabetic characters only)
 *                 example: "John Smith"
 *               password:
 *                 type: string
 *                 description: New password (min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)
 *                 example: "NewP@ss123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/edit', async (req, res, next) => {
  try {
    console.log('Update User Request Body:', req.body);
    await userController.updateUser(req, res);
  } catch (error) {
    console.error('Update User Error:', error);
    next(error);
  }
});

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Deletes a user by their email address. Also removes their profile image if exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/delete', async (req, res, next) => {
  try {
    console.log('Delete User Request Body:', req.body);
    await userController.deleteUser(req, res);
  } catch (error) {
    console.error('Delete User Error:', error);
    next(error);
  }
});

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieves a list of all users in the system.
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *             example:
 *               users:
 *                 - fullName: "John Doe"
 *                   email: "john.doe@example.com"
 *                   password: "hashedPassword123"
 *                 - fullName: "Jane Smith"
 *                   email: "jane.smith@example.com"
 *                   password: "hashedPassword456"
 */
router.get('/getAll', async (req, res, next) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    console.error('Get All Users Error:', error);
    next(error);
  }
});

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload user image
 *     tags: [Users]
 *     description: Uploads a profile image for a user. Only one image per user is allowed.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - image
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, or GIF)
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *                 filePath:
 *                   type: string
 *                   example: "uploads/image-1234567890.jpg"
 *       400:
 *         description: Invalid file format or image already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/uploadImage', upload.single('image'), async (req, res, next) => {
  try {
    console.log('Upload Image Request:', {
      body: req.body,
      file: req.file
    });
    await userController.uploadImage(req, res);
  } catch (error) {
    console.error('Upload Image Error:', error);
    next(error);
  }
});

module.exports = router;
