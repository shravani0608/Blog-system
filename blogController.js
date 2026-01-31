const Blog = require("../models/Blog");
const slugify = require("slugify");
const sanitizeHtml = require("sanitize-html");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const cleanContent = sanitizeHtml(req.body.content);

    const slug = slugify(req.body.title, {
      lower: true,
      strict: true
    });

    await Blog.create({
      title: req.body.title,
      slug: slug,
      content: cleanContent,
      author: req.user.id
    });

    res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.send("Blog Create Error");
  }
};

// Get Single Blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug
    }).populate("author");

    res.render("blog", { blog });

  } catch (err) {
    console.log(err);
    res.send("Blog Fetch Error");
  }
};
