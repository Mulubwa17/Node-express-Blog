const mongoose = require("mongoose")

const Post = require("../models/Post")


mongoose.connect("mongodb://localhost/node-express-blog-test")


Post.create({
    title: "First blog post",
    description: "1st one",
    content:"node is awesome and express too"
},(error,post)=>{console.log(error,post)})


Post.find({
    title: "First blog post"
},(error,post)=>{console.log(error,post)})

Post.find({
    
},(error,posts)=>{console.log(error,posts)})

Post.findByIdAndUpdate(
    "5f0438bb0117de1d0e89a538",
    {title: "Second blog post"},
(error,post)=>{console.log(error,post)})

Post.findByIdAndDelete(
    "5f0438bb0117de1d0e89a538",
    
(error,post)=>{console.log(error,post)})



