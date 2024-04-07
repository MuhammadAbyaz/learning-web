const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(()=>{
    console.log("Connection Open")
}).catch(err=>{
    console.log("Oh no error occurred")
    console.log(err)
})
const personSchema = mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual("fullName").get(function(){
    return `${this.first} ${this.last}`
})

// MiddleWare functions
personSchema.pre("save", async function(){
    console.log("Before saving")
})
personSchema.post("save", async function(){
    console.log("After saving")
})
const Person = mongoose.model("Person",personSchema)