const { body } = require("express-validator");
exports.insertArray = [
  body("name").isString().withMessage("student name should be string"),
  body("description").isString().withMessage("description should be string"),
  body("location").isString().withMessage("location should be string"),
  //   body("imageUrl").isString().withMessage("imageUrl should be a valid URL"),
];
