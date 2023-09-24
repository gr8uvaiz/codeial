const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    }).then(()=>{
        res.redirect('/');
    })
    .catch(err=>{
        if(err) console.log("Error in Creating Posts"); 
        return res.redirect('/');
    })
}