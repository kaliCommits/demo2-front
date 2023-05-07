import {combineReducers} from "redux";
import currentUserReducer from "./currentUserReducer";
import errorsReducer from "./errorsReducer";
import employeeReducer from "./emloyeeReducer";
import employeeHistoryReducer from "./employeeHistoryReducer";

const reducers = combineReducers({
    currentUser:currentUserReducer,
    employee:employeeReducer,
    employeeHistory:employeeHistoryReducer
});

export default reducers;