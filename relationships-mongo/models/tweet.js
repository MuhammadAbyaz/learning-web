const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo").then(()=>{
    console.log("MONGO connection open!!")
}).catch(()=>{
    console.log("OH NO!! An error occurred")
})

// One to Bajillions
const userSchema = new mongoose.Schema({
    username: String,
    age: Number
})
const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {type: mongoose.Schema.ObjectId, ref: "User"}
})

const User = mongoose.model("User",userSchema)
const Tweet = mongoose.model("Tweet",tweetSchema)


const makeTweet = async()=>{
    const user = new User({
        username: "chickenfan99",
        age: 61
    })
    const t1 = new Tweet({
        text: "OMG!! I love my chicken family",
        likes: 0,
    })
    t1.user = user;
    await user.save();
    await t1.save();
}

const findTweet = async()=>{
    const t = await Tweet.find({}).populate("user","username")
}