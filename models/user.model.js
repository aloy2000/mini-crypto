const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            max: 1000,
            minLength: 6
        },
        profile: {
            type: String,
            default: "./upload/profil/default-user.png"
        },
        biography: {
            type: String,
            
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },
        likes: {
            types: [String],
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function(email, password) {

}

const userModel  = mongoose.model('user', UserSchema);
module.exports = userModel;