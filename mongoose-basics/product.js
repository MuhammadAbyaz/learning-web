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
    },
    size: {
        type: String,
        enum: ["S","M","L"] 
    }
})
// instance methods
productSchema.methods.greet = function(){
    console.log("Hello hi")
    console.log(`- from ${this.name}`)
}
productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    this.save()
}
productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat);
    return this.categories.save()
}
productSchema.statics.fireSale = function(){
    return this.updateMany({},{onSale: true, price: 0})
}
const Product = mongoose.model("Product", productSchema)
const bike = new Product({
    name: "Mountain Bike",
    price: 999,
    onSale: true,
    categories: ["Cycling", "Safety"]
})
bike.save()