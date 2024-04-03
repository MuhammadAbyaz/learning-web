const express = require("express")
const path = require("path")
const redditData = require("./data.json")
const app = express()
app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname, "/views"))
app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/rand",(req,res)=>{
    const rand = Math.floor(Math.random() * 10) +1
    res.render("random",{rand})
})
app.get("/r/:subreddit",(req,res)=>{
    const {subreddit} = req.params
    const data = redditData[subreddit]
    if (data) res.render("subreddit",{...data})
    else res.send("<h1> We Cant Found Revelant Data</h1>")
})
app.get("/cats",(req,res)=>{
    const cats = ["Blue", "Rocket","Monty", "Winston","Stephanie"]
    res.render("cats",{cats})
})
app.get("*",(req,res)=>{
    res.send("<h1>No Such Page Found!!</h1>")
})
app.listen(8080,()=>{
    console.log("Listening At Port 8080")
})