const express = require("express");
const connectDB = require("./src/db/db");
require("dotenv").config();

connectDB();

const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const Post = require("./src/model/Post");


app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "src/public")));


// ================= ROUTES =================

// Show all posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts }); // ✅ FIXED
});


// New post form
app.get("/posts/new", (req, res) => {
  res.render("new"); // ✅ FIXED
});


// Create post
app.post("/posts", async (req, res) => {
  let { username, content } = req.body;
  await Post.create({ username, content });
  res.redirect("/posts");
});


// Show single post
app.get("/posts/:id", async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);

  if (!post) {
    return res.render("error"); // ✅ FIXED
  }

  res.render("show", { post }); // ✅ FIXED
});


// Edit form
app.get("/posts/:id/edit", async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);

  res.render("edit", { post }); // ✅ FIXED
});


// Update post
app.patch("/posts/:id", async (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;

  await Post.findByIdAndUpdate(id, { content: newContent });

  res.redirect("/posts");
});


// Delete post
app.delete("/posts/:id", async (req, res) => {
  let { id } = req.params;

  await Post.findByIdAndDelete(id);
  res.redirect("/posts");
});


// Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
