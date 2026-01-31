require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/blog", require("./routes/blogRoutes"));

// Pages
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/dashboard", require("./middleware/auth"), async (req, res) => {
  const Blog = require("./models/Blog");
  const blogs = await Blog.find();
  res.render("dashboard", { blogs, user: req.user });
});

app.get("/create", require("./middleware/auth"), (req, res) => {
  res.render("create");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Running on port " + PORT);
});
