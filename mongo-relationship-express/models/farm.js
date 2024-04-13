const mongoose = require("mongoose");
const Product = require("./product");
const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Product",
    },
  ],
});
farmSchema.post("findOneAndDelete", async function (farm) {
  if (farm.products) {
    await Product.deleteMany({ _id: { $in: farm.products } });
  }
});
const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
