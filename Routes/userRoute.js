const express = require("express");
const userController = require("../Controllers/userController");
const { authorize } = require("../Middlewares/authorization");
const { insertUserArray } = require("../Middlewares/validations/userValidator");
const validate = require("../Middlewares/validations/validator");
const router = express.Router();

router.post("/signup", insertUserArray, validate, userController.register);
router.post("/login", userController.login);
router.get("/login", userController.loginPage);
router.get("/signup", userController.signPage);
router.post("/logout", userController.logout);
router.get("/admin", userController.getAllUsers);
router.delete(
  "/admin/:userId",
  authorize("admin"),
  userController.removeUserAndItems
);
router.put("/users/:id", authorize("user"), userController.updateUserReport);

module.exports = router;
