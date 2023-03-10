const flash = require('connect-flash/lib/flash');
const User = require('../models/user');
const fs = require('fs-extra');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, users){
        return res.render('profile', {
        title: "User Profile",
        profile_user: users
        })
    })
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log("Error in multer", err); return;}
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){ 
                   if(user.avatar){
                        fs.remove(path.join(__dirname, '..', user.avatar), () =>
                        {if(err){console.log("error", err)}});
                   }
                    // saving the path of the uploaded file in the user schema 
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();    
                return res.redirect('back');
            });
        } catch (error) {
            console.log("Inside a error catch", error);
            return res.redirect('back');
        }
    }else{
        return res.status(404).send('Unauthorized');
    }
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codieal | signup"
    })
}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codieal | signin"
    })
}

module.exports.create_user = function(req, res){
   if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
   }
   User.findOne({email: req.body.email}, function(err, user){
    if(err){console.log(`Error in finding the user ${err}`); return}
    if(!user){
        User.create(req.body, function(err){
            if(err){console.log(`Error in Creating the user ${err}`); return}
            return res.redirect('/users/signin');
        })
    }else{
        return res.redirect('/users/signin');
    }
   });
}

module.exports.create_session = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        req.flash('success', 'Logout Successfully');
        if(err){
            console.log(`Error in siging out ${err}`);
        }
    });
    return res.redirect('/');
}
