const mongoose = require('mongoose');
const User = require('./user');
const Posts = require('./posts')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;