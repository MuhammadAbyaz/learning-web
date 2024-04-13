const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo").then(()=>{
    console.log("MONGO connection open!!")
}).catch(()=>{
    console.log("OH NO!! An error occurred")
})

// One to Many
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer","Winter","Fall"]
    }
})

const Product = mongoose.model("Product",productSchema)
Product.insertMany([
    {name: "Goddess Melon", price: 4.99,season:"Summer" },
    {name: "Sugar Melon", price: 4.99,season:"Summer" },
    {name: "Asparagus", price: 3.99,season:"Summer" }
])

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref:"Product"}]
})
const Farm = mongoose.model("Farm",farmSchema)
const makeFarm = async()=>{
    const farm = new Farm({name: "Full Belly Farm", city: "Guinda, CA"})
    const melon = await Product.findOne({name: "Goddess Melon"})
    farm.products.push(melon)
    await farm.save()
}

// This will give us the id on associated products
Farm.findOne({name: "Full Belly Farm"}).then(farm=>console.log(farm))

Farm.findOne({name: "Full Belly Farm"}).populate("products").then(farm=>console.log(farm))