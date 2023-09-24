const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = function(req,res){
    Post.findById(req.body.post)
    .then((post)=>{
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.post
            }).then(comment=>{
                post.comment.push(comment);
                post.save();
                res.redirect('/');
            }).catch(err=>{console.log("Error Encounterd in pushing Comments")})
        }
    })
    .catch(err=>{
        console.log("Error in finding Posts --> Comment")
    })
}