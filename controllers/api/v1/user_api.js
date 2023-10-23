const jwt = require('jsonwebtoken');
const User = require('../../../models/user')


module.exports.createSession = async function(req,res){
    try{
        const user = await User.findOne({email : req.body.email});
        if(!user || user.passowrd != req.body.passowrd){
            res.status(500).json({message: 'Error in Finding User'})
        }
        return res.status(200).json({
                message: 'Sign in SuccessFully !',
                data:{
                    token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '100000'})
                }
        })
    }
    catch(err){
        return res.status(500).json({message: 'Internal Server Error'})
    }
}