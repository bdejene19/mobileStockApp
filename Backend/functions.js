const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey =  "c592a0qad3idb0atv0f0";
const finnhubClient = new finnhub.DefaultApi()

const defaultStocks = {};

const setDefaultStocks = () => {
    // finnhubClient.quote("AAPL", (error, data, response) => {
//     let fullStockView = {
//         openPrice: data.o,
//         currPrice: data.c,
//         dayLow: data.l,
//         dayHigh: data.h,
//         percentChange: data.dp,
//         dollarChange: data.d,
//     }

//     stockBody = fullStockView;
//     console.log('this is my stock body within finnhub call: ', stockBody)
// })

}

// finnhubClient.quote("AAPL", (error, data, response) => {
//     let fullStockView = {
//         openPrice: data.o,
//         currPrice: data.c,
//         dayLow: data.l,
//         dayHigh: data.h,
//         percentChange: data.dp,
//         dollarChange: data.d,
//     }

//     stockBody = fullStockView;
//     console.log('this is my stock body within finnhub call: ', stockBody)
// })