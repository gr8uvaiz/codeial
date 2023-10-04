const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function(req,res){
    // res.send(`<h1>Hello this is loaded from the controller</h1>`)
    try{
        const posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate:{
            path: 'user',
        }
    })

    const user = await User.find({});

    return res.render('home',{
        title: 'Home',
        posts: posts,
        all_users: user,
    })

    }catch(err){
        console.log(err+" Error in home controller")
    }
    
}