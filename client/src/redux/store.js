import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from './Auth/Reducer'
import { recipeReducer } from "./Recipe/Reducer";
import {collectionReducer} from './Collection/Reducer'
import {reviewReducer} from './Reviews/Reducer'
const rootReducers = combineReducers({
    auth: authReducer,
    recipe:recipeReducer,
    collection:collectionReducer,
    review:reviewReducer
})
const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;