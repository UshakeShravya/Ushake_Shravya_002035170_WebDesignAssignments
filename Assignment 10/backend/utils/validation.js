const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('fullName').isAlpha().withMessage('Full name must contain only alphabetic characters.'),
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password').isStrongPassword().withMessage('Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.')
];

exports.validateUpdateUser = [
  body('fullName').optional().isAlpha().withMessage('Full name must contain only alphabetic characters.'),
  body('password').optional().isStrongPassword().withMessage('Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.')
];