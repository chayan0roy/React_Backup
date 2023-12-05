const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    userImage: {
        type: String
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userPassword: {
        type: String
    },
    shopID: {
        type: String
    },
    followings: [{
        followingID: {
            type: String
        },
        followingName: {
            type: String
        },
        followingImage: {
            type: String
        },
        followingCatagory: {
            type: String
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

User.pre('save', async function (next) {
    if (this.isModified('userPassword')) {
        this.userPassword = await bcrypt.hash(this.userPassword, 12);
    }
    next();
});


User.methods.generateAuthToken = async function () {
    try {
        let makeToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: makeToken });
        await this.save();
        return makeToken;
    }
    catch (err) {
        console.log(err);
    }
}

const User_Schima = mongoose.model("users", User);
module.exports = User_Schima;