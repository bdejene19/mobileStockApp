// Routing page for server routes
const express = require("express");
const finnhub = require('finnhub');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}))

// api connection
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey =  "c592a0qad3idb0atv0f0";
const finnhubClient = new finnhub.DefaultApi()




// finnhubClient.recommendationTrends("AAPL", (error, data, response) => {
//     console.log(data)
// });




router.get('/query', (req, res) => {
   



})





// route for getting full data for individual stocks 
router.get('/fullStock', (req, res) => {
    let stockBody = {}

    finnhubClient.quote("AAPL", (error, data, response) => {
        stockBody.openPrice = data.o;
        stockBody.currPrice = data.c;
        stockBody.dayLow = data.l;
        stockBody.dayHigh = data.h;
        stockBody.percentChange = data.dp
        stockBody.dollarChange = data.d;
    });

    res.send(stockBody);
    
    

})


module.exports = router;