import Stock from "./reducers/stockClass";
import { ActionType } from "./actionTypes";

// For actions => you are returning a simple action object with 2 main parameters
// 1) action type                   2) payload (what will be returned);


export const toggleDarkMode = (isDarkMode: boolean) => ({
    type: ActionType.TOGGLE_DARK_MODE, 
    payload: isDarkMode,
})
       
export const toggleLargeText = (isTextLarge: boolean) => ({
    type: ActionType.TOGGLE_LARGE_TEXT,
    payload: isTextLarge,
})

export const addToWatchlist = (addStock: String) => ({
    type: ActionType.ADD_TO_WATCHLIST,
    payload: {addStock},
})

export const deleteOffWatchList = (deleteStock: String) => ({
    type: ActionType.DELETE_OFF_WATCHLIST,
    payload: {deleteStock},
})