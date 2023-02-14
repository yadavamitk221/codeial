const Post = require('../models/posts');
const Comment = require('../models/comment');
const User = require('../models/user');
const commentMailer = require('../mailers/commentmailer');

module.exports.create = async function(req,res){
try{
    let post = await Post.findById(req.body.post)
        
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.post
            }, async function(err, comment){
                if(err){
                    console.log(`Error in creating the Comment ${err}`);
                    return;
                }
                
                let popcomment = await Comment.findById(comment._id).populate('user').exec();
                post.comments.push(comment);
                post.save();
                // res.redirect('/');
                commentMailer.newComment(popcomment); 
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment: popcomment
                        }, 
                        message: "comment created"
                    });
                }else{
                    return res.redirect('back');            
                }
            });
        }
        
}catch(err){
    console.log(`Error in creating the Post ${err}`);
    return;
}

    
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            Post.findOneAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                // return res.redirect('back');
            });
            
            if(req.xhr){
                console.log("return");
                return res.status(200).json({
                    data: {
                        commentid: req.params.id
                    }, 
                    message: "comment deleted"
                });
            }else{
                return res.redirect('back');            
            }

        }else{
            return res.redirect('back');
        } 
    });
}

