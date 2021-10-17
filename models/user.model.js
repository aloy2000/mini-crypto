const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            max: 1000,
            minlength: 6
        },
        profile: {
            type: String,
            default: "http://192.168.43.15:7000/profile-df.png"
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
            type: [String],
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

function UserException(message) {
    this.message = message
    this.name = 'UserException'
}

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        console.log(user)
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        else {
            throw new UserException("Password incorrect")
            
        }
    }
    throw new UserException("Email incorrect")
    
}

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;