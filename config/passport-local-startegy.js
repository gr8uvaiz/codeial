const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email'
},
function(email,password,done){
    User.findOne({email: email}).then(user=>{
        if(!user || user.password != password){
            return done(null,false);
        }
        return done(null,user);
    }).catch(err=>{
        console.log("error occurend in finding the user");
        return done(err);
    })
}
));
// check user is authneticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('sign-in')
}

passport.setAuthenticationUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}



// serializing the user to put the data into the cookies

passport.serializeUser(function(user,done){
    return done(null,user.id);
})

// deserializing the user to get the data from the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(user=>{
        return done(null,user);
    }).catch(err=>{
        console.log("Error in finding user --> Passport")
        return done(err);
    })
})

module.exports = passport;