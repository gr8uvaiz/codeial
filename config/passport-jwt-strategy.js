const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JwtStrategy(opts,function(jwtPayload, done){
    try{
        User.findById(jwtPayload._id)
        .then(user => {
            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
    }
    catch(err){
        console.log(err+"******");
        return;
    }
}))

module.exports = passport;