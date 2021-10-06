const mongo = require('mongoose');

const StockSchema = mongo.Schema({
    ticker: {
        type: String,
        unique: true,
    },

    companyName: {
        type: String,
        unique: true,
    },

    currentPrice: {
        type: Number,
        required: true,
    },

    percentMove: {
        type: Number,
        required: true,
    }
})

module.exports = mongo.model("Stock", StockSchema);