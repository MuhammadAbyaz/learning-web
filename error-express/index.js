const express = require("express")
const morgan = require("morgan")
const AppError = require("./AppError")
const app = express()

app.use(morgan("dev"))
// app.use((req,res,next)=>{
//     console.log("FIRST MIDDLEWARE")
//     return next()
// })
// app.use((req,res,next)=>{
//     console.log("FIRST MIDDLEWARE")
//     return next()
// })
const verifyPassword = ((req,res,next)=>{
    const {password} = req.query;
    if (password == "chickennugget"){
        next()
    }
    throw new AppError("password required", 401)
})
app.use((req,res,next)=>{
    req.requestTime = Date.now()
    console.log(`Method: ${req.method} Path: ${req.path}` )
    return next()
})

app.get("/",(req,res)=>{
    res.send("Home")
})
app.get("/dogs",(req,res)=>{
    res.send("WOOF WOOF")
})
app.get("/secret",verifyPassword,(req,res)=>{
    res.send("SECRET: Void")
})
app.use((req,res)=>{
    res.status(404).res.send("NOT FOUND")
})
app.use((err,req,res,next)=>{
    const {status = 500, message="Something went wrong"} = err
    res.status(status).send(message8)
})
app.listen(3000,()=>{
    console.log("Listening On Port 3000")
})