// Routing page for server routes
const express = require("express");
const finnhub = require('finnhub');

const WatchList = require('./models/WatchList');
const Stock = require('./models/Stock');

const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: false}))

// api connection
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey =  "c592a0qad3idb0atv0f0";
const finnhubClient = new finnhub.DefaultApi();

router.get('/test', (req, res) => {
   res.send('hello')

})


var stockBody = {};

// get user watchlist
router.get('/watchList', (req,res) => {
    
})
// route for getting full data for individual stocks 
router.get('/fullStock', (req, res) => {
    
    finnhubClient.quote("AMZN", (error, data, response) => {
        let fullStockView = {
            openPrice: data.o,
            currPrice: data.c,
            dayLow: data.l,
            dayHigh: data.h,
            percentChange: data.dp,
            dollarChange: data.d,
        }
        // console.log(data)

        stockBody = fullStockView;
        // console.log('this is my stock body within finnhub call: ', stockBody)
        res.send(stockBody);
    })

})


module.exports = router;