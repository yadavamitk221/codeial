const mongoose = require('mongoose');
const Like = require('./like');
const User = require('./user');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Including all the comments id done under this post;
    comments:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    like: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }
]
},{
    timestamps: true
})

const Posts = mongoose.model('Post', postSchema);
module.exports = Posts;