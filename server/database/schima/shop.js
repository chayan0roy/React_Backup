const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Shop = new mongoose.Schema({
    userId: {
        type: String
    },
    shopImage: {
        type: String
    },
    shopName: {
        type: String
    },
    shopType: {
        type: String
    },
    shopAddress: {
        type: String
    },
    place: {
        type: String
    },
    followers: [{
        followerID: {
            type: String
        },
        followerName: {
            type: String
        },
        followerImage: {
            type: String
        },
        followerCatagory: {
            type: String
        }
    }],
    shopProductListId: {
        type: String
    },
    shopImageListId: {
        type: String
    }
})

const Shop_Schima = mongoose.model("shops", Shop);
module.exports = Shop_Schima;
