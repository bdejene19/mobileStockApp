import Stock from "./stockClass";
import { ActionType } from "../actionTypes";

export interface watchlistState {
    // for type script, need to define what you expect to have array of => to determine what you expect your array to be made of, write it in front
    myList: Stock[] | null,   
}

const initialState = {
    myList: [],
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

export type Action = addStock | deleteStock;

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
                            myList: [...state.myList]
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
    }

}