const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/movieApp').then(()=>{
    console.log("Connection Open")
}).catch(err=>{
    console.log("Oh no error occurred")
    console.log(err)
})
mongoose.set('strictQuery', true);
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model("Movie",movieSchema);
const amadeus = new Movie({title: "Amadeus",year: 1986, score: 9.2, rating: "R"})

// Schema Validation
