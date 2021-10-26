//  when creating a reducer function in redux => need to import the action types for a more centralized approach
import { Action } from "redux";
import { ActionType } from "../actionTypes";

// set your expected initial state for what you are targeting the reducer for (e.g. is initial state of dark mode true or fale?)

const initialState = {
    isDark: true,
    isLarge: false,
}
interface ColorToggle {
    type: ActionType.TOGGLE_DARK_MODE,
    payload: boolean,
}

interface TextToggle {
    type: ActionType.TOGGLE_LARGE_TEXT,
    payload: boolean
}

export default function(state = initialState, action: ColorToggle | TextToggle) {
    switch (action.type) {
        case ActionType.TOGGLE_DARK_MODE: {
            return {
                ...state,
                isDark: !state.isDark, 
            };
        } 

        case ActionType.TOGGLE_LARGE_TEXT: {
            return {
                ...state,
                isLarge: !state.isLarge, 
            };
            
        }
        default: {
            return state;
        }

    }
}

