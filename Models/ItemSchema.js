const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "general" },
  location: { type: String, required: true },
  imageUrl: { type: String, default: "no-pic.png" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  state: { type: Boolean, default: false },
});

module.exports = mongoose.model("Item", itemSchema);
