const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date, 
        required: true
    },
    src:{
        type:String,
        required:false,
        default:""
    },
    noOfPostsLiked:{
        type:Number,
        default:0
    },
});
const User=mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});
const Post=mongoose.model('Post',postSchema)
module.exports = {User,Post}
