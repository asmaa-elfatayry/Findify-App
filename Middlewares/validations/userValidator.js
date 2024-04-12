const { body } = require("express-validator");

exports.insertUserArray = [
  body("username").isString().withMessage("Username should be a string"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
