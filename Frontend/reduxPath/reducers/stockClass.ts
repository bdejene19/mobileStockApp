export default class Stock {
    stockName: string;
    ticker: string;
    openPrice: number;
    closePrice: number;
    currentPrice: number;
    percentageMove: number;
    
    constructor(name: string, ticker: string, open: number, close: number, currPrice: number, percentMove: number) {
        this.stockName = name,
        this.ticker = ticker,
        this.openPrice= open,
        this.closePrice = close,
        this.currentPrice = currPrice,
        this.percentageMove = percentMove
    }

    getStockName() {
        return this.stockName;
    }

    getTicker() {
        return this.ticker;
    }

    getCurrentPrice() {
        return this.currentPrice;
    }

    getOpenPrice() {
        return this.openPrice;
    }

    getClosePrice() {
        return this.closePrice;
    }


    getDayDollarMove() {
        let dollarMovement = this.getOpenPrice() - this.getCurrentPrice();
        return dollarMovement
    }
    getDayPercentMove() {
        let dollarMovement = this.getDayDollarMove();
        let percentMove = (dollarMovement / this.getOpenPrice()) * 100;
        return percentMove;
    }

}