const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(()=>{
    console.log("Connection Open")
}).catch(err=>{
    console.log("Oh no error occurred")
    console.log(err)
})
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength : 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false 
    },
    categories: {
        type: [String]
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
})
const Product = mongoose.model("Product", productSchema)
const bike = new Product({
    name: "Mountain Bike",
    price: 999,
    onSale: true,
    categories: ["Cycling", "Safety"]
})
bike.save()