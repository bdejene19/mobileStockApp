const mongo = require('mongoose');
const Stock = require('./Stock');

const WatchListSchema = mongo.Schema({
    stockList: {
        type: [Stock.schema],
        default: [],
    },
})

module.exports = mongo.model('WatchList', WatchListSchema);