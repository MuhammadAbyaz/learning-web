import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "./models/user.js";
import session from "express-session";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  session({
    secret: "Not a good secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/authDemo")
  .then(() => {
    console.log("Mongo Connection Open!!");
  })
  .catch((err) => {
    console.log("Oh no error occurred");
    console.log(err);
  });
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) return res.redirect("/login");
  next();
};
app.get("/", (req, res) => {
  res.send("Logged in");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findAndValidate(username, password);
  if (user) {
    req.session.user_id = user._id;
    res.redirect("/secret");
  } else res.redirect("/login");
});
app.get("/secret", requireLogin, (req, res) => {
  res.render("secret");
});
app.post("/logout", (req, res) => {
  req.session.user_id = null;
  //   req.session.destroy()
  res.redirect("/login");
});
app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const user = new User({
    username,
    password,
  });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/secret");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
