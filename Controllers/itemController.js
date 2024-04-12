const Item = require("../Models/ItemSchema");
require("../Middlewares/multerConfig");
//for main page
module.exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find({}).populate("createdBy");

    let userRole = req.userRole;

    if (items) {
      // console.log("test log ", items);
      res.render("items", {
        items: items,
        userRole: userRole,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.addItem = async (req, res, next) => {
  try {
    const { name, description, category, location } = req.body;

    //  console.log(req);
    const imageUrl = req.file ? req.file.filename : "no-pic.png"; //deafult image if user not select

    const newItem = new Item({
      name,
      description,
      category,
      location,
      imageUrl,
      createdBy: req.user.userId,
    });

    await newItem.save();
    res.status(201).json({ message: "new item added", data: newItem });
  } catch (error) {
    next(error);
  }
};
// just for test
module.exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fItem = await Item.findById(id);
    if (!fItem) {
      return res.status(404).json({ message: "id not found!" });
    }
    res.status(200).json({ message: "Item Found => ", data: fItem });
  } catch (error) {
    next(error);
  }
};

//made crud operation for learning
// module.exports.updateItem = async (req, res, next) => {
//   try {
//     const { name, description, category, location } = req.body;
//     if (req.file && req.file.filename) {
//       this.updateFailds.imageUrl = req.file.filename;
//     }
//     let updateFields = {};
//     if (name) updateFields.name = name;
//     if (description) updateFields.description = description;
//     if (category) updateFields.category = category;
//     if (location) updateFields.location = location;

//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       updateFields
//     );
//     if (!updatedItem) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     res.status(200).json({ message: "updated done", data: updatedItem });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deliverItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.state = true;
    await item.save();

    res.status(200).json({ message: "Item delivered successfully" });
  } catch (error) {
    console.error("Error delivering item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
