const express = require("express")
const app = express()

// it runs when any request comes to the server
// app.use((request,response)=>{
//     console.log("We got new request!!")
//     response.send("Hey I am the response")
// })
app.get('/cats',(req,res)=>{
    res.send("<h1>Meow</h1>")
})
app.get('/dogs',(req,res)=>{
    res.send("<h1>Bark</h1>")
})
app.get("/r/:subreddit",(req,res)=>{
    const { subreddit } = req.params
    res.send(`<h1>Its are response from subreddit ${subreddit}</h1>`)
})
app.get("/search",(req,res)=>{
    const {q} = req.query
    res.send(`<h1>Search results for ${q}</h1>`)
})
// rest of the cases
app.get("*",(req,res)=>{
    res.send("I dont know")
})
app.listen(3000,()=>{
    console.log("We are listening to any request")
})