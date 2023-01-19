const mongoose = require('mongoose');
const User = require('./user');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Posts = mongoose.model('Post', postSchema);
module.exports = Posts;