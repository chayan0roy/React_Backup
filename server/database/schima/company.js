const mongoose = require("mongoose");

const Company = new mongoose.Schema({
    companyName: {
        type: String
    },
    companyImage: {
        type: String
    },
    productIds : [{
        productId: {
            type : String
        }
    }]
})

const Company_Schima = mongoose.model("companies", Company);
module.exports = Company_Schima;
