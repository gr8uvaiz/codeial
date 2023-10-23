const User = require('../models/user')
const fs = require('fs');
const path = require('path');
module.exports.profile = function (req,res) {
    // res.send('<h1>User Controller Here</h1>')
        User.findById(req.params.id).then(user=>{
            if(user){
                return res.render('user_profile',{
                    title: 'User Profile',
                    profile_user: user,
                })
            }
            else{
                return res.redirect('sign-in');
            }
        })
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        const user = await User.findById(req.params.id)
        User.uploadedAvatar(req,res,function(err){

            if(err) console.log('Error in Multer',err);
            user.name = req.body.name;
            user.email = req.body.email;
            if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            res.redirect('back');

        })
    }
    else{
        res.status(401).send('Unauthorized');
    }
}

module.exports.userSignUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile')
    }

    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}
module.exports.userSignIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}

// for get data for signup
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // For prevent creating multiple accounts
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        // User not found, create a new user
        return User.create(req.body)
          .then(newUser => {
            return res.redirect('sign-in');
          })
          .catch(err => {
            console.error("Error encountered in creating signup", err);
          });
      } else {
        // User with the provided email already exists
        req.flash('error','User Already Exist');
        return res.redirect('back');
      }
    })
    .catch(err => {
      console.error("Error in finding the email", err);
    });
  


    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // }).then(data=>{
    //     // console.log(data);
    // }).catch(err=>{
    //     console.log("Error encountered in creating and sending data to db")
    // })
    // res.redirect('sign-in')
}



// for authenticate the sign in
// previous code of sign in 
// module.exports.createSession = function(req,res){
//     // Match The data
//     User.findOne({email: req.body.email})
//     .then(user=>{
//         if(user){
//             // Check password
//             if(user.password != req.body.password){
//                 res.redirect('back')
//             }
//             else{
//                 res.cookie('user_id',user.id);
//                 return res.redirect('profile');
//             }

//         }
//         else{
//             // user not exist
//             res.redirect('back');
//         }
//     })
    
// }

module.exports.createSession = function(req,res){
    req.flash('success','You have successfully logged in !');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err) return next(err);
    });
    req.flash('success','You have succesfully looged out !');
    return res.redirect('/');
}