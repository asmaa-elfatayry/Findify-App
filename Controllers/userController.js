const User = require("../Models/UserSchema");
const Item = require("../Models/ItemSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.redirect("/login");
    // res.status(201).json({ message: "New user created", data: newUser });
  } catch (error) {
    next(error);
  }
};
//render pages
exports.loginPage = (req, res) => {
  res.render("login");
};
exports.signPage = (req, res) => {
  res.render("signup");
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // console.log("found", user);
    // console.log(req.body.email);
    // console.log(req.body.password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(passwordMatch);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // console.log(token);
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
};

module.exports.updateUserReport = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { report: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User report updated successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

//for admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("admin", { users });
  } catch (error) {
    next(error);
  }
};

exports.removeUserAndItems = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Item.deleteMany({ createdBy: userId });

    res
      .status(200)
      .json({ message: "User and associated items deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//{
// "username":"admin",
// "email":"admin@gmail.com",
// "password":"myadmin1234",
// "role":"admin"
// }
