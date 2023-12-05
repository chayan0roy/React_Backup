const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ShopProductList = new mongoose.Schema({
    shopId:{ 
        type: String 
    },
    productList: [
        {
            productId: { 
                type: String 
            },
            quantity: { 
                type: Number 
            },
            productPrice: { 
                type: Number 
            },
            sellType: { 
                type: String 
            },
            offer: { 
                type: Number 
            },
            deliveryCharge: {
                type: Number
            }
        }
    ],
})

const ShopProductList_Schima = mongoose.model("shop_product_list", ShopProductList);
module.exports = ShopProductList_Schima;