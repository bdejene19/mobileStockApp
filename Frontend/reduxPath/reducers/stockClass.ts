export default class Stock {
    stockName: string;
    ticker: string;
    openPrice: number;
    closePrice: number;
    dayHigh: number | undefined;
    dayLow: number | undefined;
    currentPrice: number;
    percentageMove: number;
    exchange: string | undefined;
    volume: number | undefined;
    res;
    async getDayQuote() {
        let res = await ((await fetch(`https://api.twelvedata.com/quote?symbol=${this.ticker}&apikey=d71724ce43e342f19aa946ce9d197a8a`)).json());
        this.res = res;
        this.stockName = res.name;
        this.ticker = res.symbol
        this.openPrice = res.open,
        this.exchange = res.exchange
        this.dayHigh = res.high
        this.dayLow = res.low;
        this.volume = res.volume;
        this.percentageMove = res.percent_change
        return this.res, this.stockName, this.ticker,this.openPrice,this.exchange, this.dayHigh, this.dayLow, this.volume, this.percentageMove
    }
    
    constructor(name: string, ticker: string, open: number, close: number, currPrice: number, percentMove: number, high?: number, low?: number, exchange?: string, response?: any) {
        this.stockName = name;
        this.ticker = ticker;
        this.openPrice= open;
        this.closePrice = close;
        this.dayHigh = high;
        this.dayLow = low;
        this.currentPrice = currPrice;
        this.percentageMove = percentMove;
        this.exchange = exchange
        this.res = response;
    }
  
  

    getStockName(): string {
        return this.stockName;
    }

    getTicker():string {
        return this.ticker;
    }

    getCurrentPrice():number {
        return this.currentPrice;
    }

    getOpenPrice():number {
        return this.openPrice;
    }

    getClosePrice() {
        return this.closePrice;
    }


    getDayDollarMove() {
        let dollarMovement = this.getOpenPrice() - this.getCurrentPrice();
        return dollarMovement
    }
    getDayPercentMove():number | string {
        let dollarMovement = this.getDayDollarMove();
        let percentMove = (dollarMovement / this.getOpenPrice()) * 100;
        return percentMove;
    }

}