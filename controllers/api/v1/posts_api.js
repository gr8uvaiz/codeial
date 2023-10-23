const Post = require('../../../models/post');
const Comment = require('../../../models/comment')

module.exports.index = async function(req,res){
const posts = await Post.find({})
.populate('user')
.populate({
    path: 'comment',
    populate:{
        path: 'user',
    }
})
    res.status(200).json({
        message: 'List of Posts',
        posts: posts
    })
    // res.json(200,)
}

module.exports.destory = async function(req,res){
    try{
        const post = await Post.findById(req.params.id)
        if(post.user == req.user.id){
            post.deleteOne();

            await Comment.deleteMany({post: req.params.id});
            return res.json(200,{
                message: "Post and associated comment deleted succesfully"
            })
        }
        else{
            res.status(401).json({message: 'Unauthorized user access !'})
        }

    }catch(err){
        res.json(500,{
            message: "Error in finding and deleting the post"
        })
        console.log(err+"Error in Deleting Post");
        // return;

    }
    
}