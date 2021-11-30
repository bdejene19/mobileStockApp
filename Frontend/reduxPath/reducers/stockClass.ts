import { dataPlot } from "../../components/TestLineChart";

export default class Stock {
    stockName: string;
    ticker: string;
    openPrice: number;
    closePrice: number;
    dayHigh: number | undefined;
    dollarChange: number | undefined;
    dayLow: number | undefined;
    currentPrice: number;
    percentageMove: number;
    exchange: string | undefined;
    graphData: dataPlot[];
    volume: number | undefined;
    async getDayQuote() {
        let res = await ((await fetch(`https://api.twelvedata.com/quote?symbol=${this.ticker}&apikey=d71724ce43e342f19aa946ce9d197a8a`)).json());
        this.stockName = res.name;
        this.ticker = res.symbol
        this.openPrice = res.open,
        this.exchange = res.exchange
        this.dayHigh = res.high
        this.dayLow = res.low;
        this.closePrice = res.close;
        this.volume = res.volume;
        this.percentageMove = res.percent_change
        this.dollarChange = res.change
        
        return this.stockName, this.ticker,this.openPrice,this.exchange, this.dayHigh, this.dayLow, this.volume, this.percentageMove
    }
    
    
    constructor(name: string, ticker: string, open: number, close: number, currPrice: number, percentMove: number, high?: number, low?: number, exchange?: string,) {
        this.stockName = name;
        this.ticker = ticker;
        this.openPrice= open;
        this.closePrice = close;
        this.dayHigh = high;
        this.dayLow = low;
        this.currentPrice = currPrice;
        this.percentageMove = percentMove;
        this.exchange = exchange;
        this.graphData = [];

    }

    getStockName(): string {
        return this.stockName;
    }

    getTicker():string {
        return this.ticker;
    }

    setCurrentPrice(currentPrice: number):number {
        this.currentPrice = currentPrice;
        return this.currentPrice
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

    getDayHighLow(): object {
        let high = this.dayHigh;
        let low = this.dayLow;
        return {
            highDay: high,
            lowDay: low,
        }
    }

    getDayDollarMove():number {
        this.dollarChange = this.currentPrice - this.openPrice;
        return this.dollarChange;
    }
    getDayPercentMove():number {
        this.percentageMove =  parseFloat((this.currentPrice / this.openPrice).toFixed(2))
        return this.percentageMove;
    }
    
    addDataPointToGraphData(dataPoint: dataPlot): void {
        this.graphData.push(dataPoint);
    }

    getGraphData(): dataPlot[] {
        return this.graphData;
    }
    
}