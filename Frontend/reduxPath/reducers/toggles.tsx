//  when creating a reducer function in redux => need to import the action types for a more centralized approach
import { ActionType } from "../actionTypes";

// set your expected initial state for what you are targeting the reducer for (e.g. is initial state of dark mode true or fale?)

// creating my interface for my state
export interface toggleStates {
    isDark: boolean,
    isLarge: boolean,
}

// creating initial state
const initialState = {
    isDark: true,
    isLarge: false,
}


// creating types for my different toggle actions
interface ColorToggle {
    type: ActionType.TOGGLE_DARK_MODE,
    payload: boolean,
}

interface TextToggle {
    type: ActionType.TOGGLE_LARGE_TEXT,
    payload: boolean
}

export type Action = ColorToggle | TextToggle

export default function(state: toggleStates = initialState, action: Action) {
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

