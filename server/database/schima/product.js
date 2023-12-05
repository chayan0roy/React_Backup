const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    productName: {
        type: String
    },
    productImage: {
        type: String
    },
    companyName: {
        type: String
    },
    catagory: {
        type: String
    },
    description: {
        type: String
    },
    rating: {
        type: Number
    }
})

const Product_Schima = mongoose.model("products", Product);
module.exports = Product_Schima;
