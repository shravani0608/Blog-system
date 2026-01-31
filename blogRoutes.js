const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const blog = require("../controllers/blogController");

router.post("/create",
  auth,
  role("admin"),
  blog.createBlog
);

router.get("/:slug", blog.getBlog);

module.exports = router;
