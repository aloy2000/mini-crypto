const mongoose = require('mongoose');

const PostSchema =  new mongoose.Schema(
    {
        posterId: {
            type: String,
            require: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 600 
        },
        picture: {
            type: String,
        },
        video: {
            type: String
        },

        likers: {
            type: String,
        },
    }
)

const postModel = mongoose.model('post', PostSchema);
module.exports = postModel;