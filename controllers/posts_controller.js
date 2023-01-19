const Post = require('../models/posts');
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    }, function(err, post){
        if(err){
            console.log(`Error in creating the Post ${err}`);
        }
        res.redirect('back');
    })
}