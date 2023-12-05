const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ShopImageList = new mongoose.Schema({
    userId: { 
        type: String 
    },
    shopname: {
        type: String
    },
    shopType: {
        type: String
    },
    address: {
        type: String
    },
    shopProductListId: {
        type: String
    },
    shopImageListId: {
        type: String
    },
    



    sellType: {
        type: String
    },
    productPrice: {
        type: Number
    },
    deliveryCharge: {
        type: Number
    },



    offer: {
        type: Number
    },





    
    email: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const ShopImageList_Schima = mongoose.model("shop_image_list", ShopImageList);
module.exports = ShopImageList_Schima;



