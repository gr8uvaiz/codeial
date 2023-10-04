const Post = require('../models/post');
const Comment = require('../models/comment')


module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user.id
        });
        req.flash('success','Post created succesfully');
        res.redirect('/');
    }catch(err){
        console.log(err+"Error in Creating Posts");
        return;
    }
}

module.exports.destory = async function(req,res){
    try{
        const post = await Post.findById(req.params.id)
        if(post.user == req.user.id){
            post.deleteOne();

            await Comment.deleteMany({post: req.params.id});
            req.flash('success','Post Deleted Successfully')
            return res.redirect('back');
        }
        else{
            req.flash('error','Post cannot be deleted');
            res.redirect('back');
        }

    }catch(err){
        console.log(err+"Error in Deleting Post");
        return;

    }
    
}