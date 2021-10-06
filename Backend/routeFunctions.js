export default getFullStock = (req, res) => {
    
    finnhubClient.quote("AMZN", (error, data, response) => {
        let fullStockView = {
            openPrice: data.o,
            currPrice: data.c,
            dayLow: data.l,
            dayHigh: data.h,
            percentChange: data.dp,
            dollarChange: data.d,
        }
        console.log(data)

        stockBody = fullStockView;
        console.log('this is my stock body within finnhub call: ', stockBody)
        res.send(stockBody);
    })
}
