const Post = require('../models/posts');

module.exports.home = function(req, res){  
    Post.find({}).populate('user').exec(function(err, posts){
        if(err){
            console.log('Error in finding the Post', err);
        }
        return res.render('home', {
            title: "Codeal",
            posts: posts
        });
    })
}