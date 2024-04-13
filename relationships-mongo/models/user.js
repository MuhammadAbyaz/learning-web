const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo").then(()=>{
    console.log("MONGO connection open!!")
}).catch(()=>{
    console.log("OH NO!! An error occurred")
})

const userSchema = mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {street: String, city:String, state: String,country: String}
    ]
})

const User = mongoose.Model("User",userSchema)

// One to few relationship
const makeUser = async()=>{
    const u = new User({
        first: "Hary",
        last: "Potter",
    })
    u.addresses.push({
        _id: {_id: false},
        street: "123 Sesame St.",
        city: "New York",
        state: "NY",
        country: "USA"
    })
    const res = await u.save()
}
