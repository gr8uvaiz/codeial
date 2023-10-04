const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function(req,res){
   const post =  await Post.findById(req.body.post)
        try{
            if(post){
                const comment = await Comment.create({
                    content: req.body.content,
                    user: req.user.id,
                    post: req.body.post
                })
    
                post.comment.push(comment);
                post.save();
                req.flash('success','Comment Succesfully');
                return res.redirect('/');
            }
        }catch(err){
            console.log(err+"Error in creating comment");
            return;
        }
}

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id)
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.deleteOne();
                await Post.findByIdAndUpdate(postId,{$pull: {comment: req.params.id}})
                req.flash('success','Comment deleted !')
                return res.redirect('/');
            }
            else{
                req.flash('error','You cannot delete the comment');
               return res.redirect('back');
            }
    }
    catch(err){
        console.log(err+"Error in deleting comment");
        return;
    }
}

  