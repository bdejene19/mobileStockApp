// Routing page for server routes
const express = require("express");

// instead of finnhub (1 api key per subscription), will use twelvedata api
const twelvedata = require('twelvedata');
const config = {
    key: "6ca188086bb74ba88ddaa94c9d184322", // api key
}

const client = twelvedata(config);

// now to get time series
let params = {
    symbol: 'GME',
    interval: '1min',
    outputsize: 10,
}




const WatchList = require('./models/WatchList');
const Stock = require('./models/Stock');

const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: false}))


router.get('/test', (req, res) => {
   res.send('hello')

})

client.timeSeries(params).then((data) => console.log(data)).catch(e => console.log('there was an error'))
var stockBody = {};
// get user watchlist
router.get('/watchList', (req,res) => {
    
})
// route for getting full data for individual stocks 
router.get('/fullStock', (req, res) => {


})


module.exports = router;