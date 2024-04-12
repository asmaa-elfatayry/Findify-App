const express = require("express");
const itemController = require("../Controllers/itemController");
const upload = require("../Middlewares/multerConfig");
const { authorize } = require("../Middlewares/authorization");
const { insertArray } = require("../Middlewares/validations/itemVlidators");
const validate = require("../Middlewares/validations/validator");
const router = express.Router();

router.get("/", itemController.getAllItems);
router.post(
  "/items",
  authorize("user"),
  upload.single("image"),
  insertArray,
  validate,
  itemController.addItem
);

router.get("/items/:id", itemController.getItemById);

router.put("/items/:itemId", itemController.deliverItem);

module.exports = router;
