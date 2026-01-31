const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed
    });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.send("Register Error");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.redirect("/login");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.redirect("/login");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.send("Login Error");
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
