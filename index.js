const express = require("express")
const path = require("path")
const expressEdge = require("express-edge")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Post = require("./models/Post")


const app = express()


mongoose.connect("mongodb://localhost/node-express-blog")


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(expressEdge.engine)

app.set("views",`${__dirname}/views`)


app.get("/",async (req,res)=>{
    const posts = await Post.find({})
    console.log(posts)
    res.render("index",{
        posts
    })
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/post/:id",async (req,res)=>{
    const Post = await Post.findById(req.params.id)
    console.log(req.params)
    res.render("post",{
        
    })
})

app.get("/post/new",(req,res)=>{
    res.render("create")
})

app.post("post/store",(req,res)=>{
    Post.create(req.body,(error,post)=>{
        res.redirect("/")
    })
    
})






app.listen(4000,()=>{'app listening on port 4000'})