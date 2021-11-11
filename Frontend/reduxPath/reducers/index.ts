// where all my reducers are being combined and injected into redux to handle dispatching actions
// defining root reducer

import { combineReducers } from "redux";
import toggles from "./toggles";
import watchlistHandles from "./watchlistHandles";

const rootReducer = combineReducers({
    toggleSwitches: toggles,
    // userWatchList: watchlistHandles,
});
export default rootReducer;