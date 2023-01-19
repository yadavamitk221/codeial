const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "User Profile"
    })
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log(`Error in siging out ${err}`);
        }
    });
    return res.redirect('/');
}
