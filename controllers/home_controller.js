const User = require('../models/user')
const Post = require('../models/posts');

module.exports.home = async function(req, res){  

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })

      let users = await User.find({})
            return res.render('home', {
            title: "Codeal",
            posts: posts,
            all_users: users
            });
    
    }catch(err){
        console.log('Error', err);
        return;
    }
}