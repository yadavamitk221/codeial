const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.create_session = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            console.log("email:", req.body.email);
            console.log("password:", req.body.password);
            return res.json('422', {
                message: "Invalid email ID or password"
            });
        }
        return res.json('200', {
            message:  "Login Successful",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        });
        
    } catch (error) {
        console.log("***************",error);
        return res.json('500', {
            message:'Internal server error'
        });
    }
}