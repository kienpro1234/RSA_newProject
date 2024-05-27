import { combineReducers, createStore } from "redux";
import { logginedReducer } from "./logginedReducer";



const rootReducer = combineReducers({
    logginedReducer,
})

const store = createStore(rootReducer);

export default store;
