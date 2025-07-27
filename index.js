const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to support PUT, PATCH, DELETE methods via query like ?_method=PATCH
app.use(methodOverride("_method"));

// Set view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// In-memory post data (simulating a database)
let posts = [
  {
    id: uuidv4(),
    username: "apna College",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "Brijesh",
    content: "I am an It Student",
  },
  {
    id: uuidv4(),
    username: "Adityagupta",
    content: "Selected for Placement",
  },
];

// 📄 GET /posts – Show all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // Renders list of posts
});

// ➕ GET /posts/new – Show form to create a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs"); // Form with inputs for username + content
});

// ✅ POST /posts – Handle new post form submission
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content }); // Add post to array
  res.redirect("/posts"); // Go back to post list
});

// 🔍 GET /posts/:id – Show a single post by ID
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("show.ejs", { post }); // Render detail view
});

// ✏️ GET /posts/:id/edit – Show edit form for a post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("edit.ejs", { post }); // Form pre-filled with post data
});

// 🔄 PATCH /posts/:id – Handle edit form submission
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { content: Newcontent } = req.body; // get textarea value (named 'content')
  let post = posts.find((p) => id == p.id);
  post.content = Newcontent; // update content
  console.log(post);
  res.send("patch request is working"); // You can replace this with res.redirect("/posts");
});

//Delete Data From the Ui
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

//  Start server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
