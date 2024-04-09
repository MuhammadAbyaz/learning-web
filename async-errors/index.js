const express = require("express");
const AppError = require("./AppError");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Oh no error occurred");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

function wrapAsync (func){
  return function(){
    func(req,res,next).catch(e=> next(e))
  }
}
// Index Page to show all products
app.get("/products", wrapAsync(async (req, res,next) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
}));

// Page to add new product
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

// Route to submit add product form
app.post("/products", wrapAsync(async (req, res,next) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
}));

// Route to get detail info about a specific product
app.get("/products/:id", wrapAsync(async (req, res,next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) { throw new AppError("Product Not Found",404)}
  res.render("products/details", { product });
}));

// Page to edit product
app.get("/products/:id/edit", wrapAsync(async (req, res,next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {return next(new AppError("Product Not Found",404))}
  res.render("products/edit", { product });
}));

// Route to submit edit product form
app.put("/products/:id", wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect(`/products/${id}`);
}));

// Route to delete a specific product
app.delete("/products/:id", wrapAsync(async (req, res,next) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
}));
const handleValidationError = e=>{
  console.dir(err)
  return new AppError(`Validation Failed....${err.message}`,400)
}
app.use((err,req,res,next)=>{
  console.log(err.name)
  if (err.name === "ValidationError") err = handleValidationError(err)
  next(err)
})
app.use((err,req,res,next)=>{
  const {status = 500, message= "Something went wrong"} = err;
  res.status(status).send(message);
})
app.listen(3000, () => {
  console.log("Listening On Port 3000!");
});
