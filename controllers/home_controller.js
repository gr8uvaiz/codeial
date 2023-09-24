const Post = require("../models/post")

module.exports.home = function(req,res){
    // res.send(`<h1>Hello this is loaded from the controller</h1>`)
    Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate:{
            path: 'user',
        }
    })
    .exec()
    .then(data=>{
        return res.render('home',{
            title: 'Home',
            posts: data
        })
    })
}