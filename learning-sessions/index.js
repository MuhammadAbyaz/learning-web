import express from "express"
import session from "express-session"
const app = express()
app.use(session({
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: false
}))
app.get("/viewcount",(req,res)=>{
    if (req.session.count) req.session.count++
    else req.session.count =1
    res.send(`You have viewed this page ${req.session.count}`)
})
app.get("/register",(req,res)=>{
    const {username} = req.query;
    req.session.username = username;
    res.redirect("/greet")
})
app.get("/greet",(req,res)=>{
    const {username} = req.session
    if (!username) {res.send("Welcome")}
    else res.send(`Welcome back ${req.session.username}`)
})
app.listen(3000,()=>{
   console.log("listening on port 3000") 
})
