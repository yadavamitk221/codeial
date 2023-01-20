const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log(`Error in finding the Post ${err}`);
            return
        }

        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.post
            }, function(err, comment){
                if(err){
                    console.log(`Error in creating the Comment ${err}`);
                    return;
                }   
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    })
}