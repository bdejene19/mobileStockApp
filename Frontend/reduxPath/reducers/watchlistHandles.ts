import Stock from "./stockClass";
import { ActionType } from "../actionTypes";

export type Action = addStock | deleteStock;


// for api structure => can only have 8 connections in WS.send() symbol parameters.
// therefore my watchlist state should be list of tickers
// then in homepage function => map over them to link to websocket
export default function(state: watchlistState = initialState, action: Action) {
    // check the action type to determine what action needs to be taken
    switch (action.type) {
        case (ActionType.ADD_TO_WATCHLIST): {
            try {
                if (state.myList !== null) {
                    let stockAlreadyAdded: boolean = false;
                    let watchlistLength = state.myList.length;
                    let counter: number = 0;
                    while (counter < watchlistLength && stockAlreadyAdded === false) {
                        if (state.myList[counter] === action.payload) {
                            stockAlreadyAdded = true;
                        } 
                        counter++;
                    }
        
                    if (stockAlreadyAdded = false) {

                        return {
                            // list of tickers
                            myList: [...state.myList, action.payload.ticker]
                        }
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
                

            } catch(e) {
                console.log(e);
            }
          
        }
        case (ActionType.DELETE_OFF_WATCHLIST): {
            try {

                if (state.myList !== null) {

                    let stockFound: boolean = false;
                    let watchlistLength = state.myList.length;
                    let counter: number = 0;

                    while (counter < watchlistLength && stockFound === false) {
                        if (state.myList[counter] === action.payload) {
                            stockFound = true;
                            return {
                                myList: [...state.myList],
                            }
                            
                        } 
                        counter++;
                    }
                } else {
                    return null;
                }


            } catch(e) {
                console.log(e);
            }
           
        }
        default: {
            return state
        } 
    }

}

// design interface for my individual stock item
// needs 2 objects to handle 2 different events => 1) immediate real time data      2) advanced stock specific data (for Full Stock View component) 
interface stockItem {
    previewContent: {
        ticker: string;
        currPrice: number | undefined,
    },
 
    tickerContent: {
        stockName: string,
    }
}
export interface watchlistState {
    // for type script, need to define what you expect to have array of => to determine what you expect your array to be made of, write it in front
    myList: Stock[] | null,   
}
// initial items will be apple
let testObj = new Stock('Apple', 'AAPL', 0, 0, 0, 0)
// let testObj2 = new Stock('Apple', 'RY', 0, 0, 0, 0)

testObj.getDayQuote();

const initialState = {
    myList: [testObj],
}

// action interface typchecking for reducer
interface addStock {
    type: ActionType.ADD_TO_WATCHLIST,
    payload: Stock,
}

interface deleteStock {
    type: ActionType.DELETE_OFF_WATCHLIST,
    payload: Stock,
}
