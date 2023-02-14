const Post = require('../models/posts');
const Comment = require('../models/comment');
const Like = require('../models/like');
const user = require('../models/user');

module.exports.toggleLike = async function(req, res){

    try {
        let likeable;
        let deleted;
        if(req.query.type == 'Post'){
            console.log(req.query.id);
            likeable =  await Post.findById(req.query.id);
        }else{
            likeable = Comment.findById(req.params.id).populate('like');
        }

        console.log(likeable);
        let exestingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        // if Like already exist then remove it
        if(exestingLike){
            
            likeable.like.pull(exestingLike._id);
            likeable.save();
            exestingLike.remove();
            deleted = true;
        }else{
            // else make a new Like 
            // console.log(likeable, " inside else");
            let newLike =  await Like.create({    
                user: req.user.id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            // console.log(newLike);
            likeable.like.push(newLike._id);
            likeable.save();

        }

        return res.json('200', {
            data: {
                status:  deleted
            },
            message: "Request Successfull"
            
        })
    } catch (err) {
        return res.json('500 ', {
            message: `Internal server in liking the post ${err}`
        });
    }

    
}