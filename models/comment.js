const mongoose = require('mongoose');
const User = require('./user');
const Posts = require('./posts');
const Like = require('./like');

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
    },
    like: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;