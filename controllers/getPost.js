const path = require("path")
const Post = require("../models/Post")



module.exports = async (req,res) => {
    const Post = await Post.findById(req.params.id).populate('author')
    console.log(req.params)
    res.render("post",{

    })
   
};