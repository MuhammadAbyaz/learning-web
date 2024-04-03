const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "Thats so funny, LOL",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go bird watching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});
app.get("/comments/new", (req, res) => {
  res.render("comments/new", { comments });
});
app.post("/comments/", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuid(), username, comment });
  res.redirect("/comments");
});
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect("/comments");
});
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});
app.post("/tacos", (req, res) => {
  console.log(req.body);
});
app.listen("8080", () => {
  console.log("Listening at port 8080");
});
