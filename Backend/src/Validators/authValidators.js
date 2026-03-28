const { body } = require("express-validator");

const registerValidator = [
  body("username").trim().notEmpty().withMessage("Username is required.").isLength({ min: 3 }).withMessage("Username must be at least 3 characters."),
  body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email address.").normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must include at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must include at least one number."),
];

const loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email address.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
];

module.exports = { registerValidator, loginValidator };
