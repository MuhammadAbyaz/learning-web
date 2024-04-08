const express = require("express")
const morgan = require("morgan")
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
    res.send("SORRY YOU NEED A PASSWORD")
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
app.listen(3000,()=>{
    console.log("Listening On Port 3000")
})