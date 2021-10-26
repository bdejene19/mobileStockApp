// where all my reducers are being combined and injected into redux to handle dispatching actions
// defining root reducer

import { combineReducers } from "redux";
import toggles from "./toggles";
export default combineReducers({toggles});