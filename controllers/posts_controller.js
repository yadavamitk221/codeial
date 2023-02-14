const Post = require('../models/posts');
const Comment = require('../models/comment')
module.exports.create = async function(req, res){
   try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user.id
    });

    if(post){
        post = await Post.findById(post._id).populate('user');
    }
    
    if(req.xhr){
         return res.status(200).json({
            data: {
                post: post
            },
            message: "Post is created"
         })
    }

    res.redirect('back');
   }catch(err){
        console.log(`Error in creating the Post ${err}`);
        return;
   }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
           post.remove();

            await Comment.deleteMany({post: req.params.id})
        
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        postid: req.params.id
                    }, 
                    message: "post deleted"
                })
            }else{
            return res.redirect('back');            
            }
            // res.redirect('back');
        }
        
        else{
            return res.redirect('back');            
        }
    }catch(err){
        console.log(`Error in deleating the Post ${err}`);
        return res.redirect('back');    
    }
        
}