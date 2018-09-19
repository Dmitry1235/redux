import {combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';

import toDoListReduser from "./toDoListReduser";

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  toDoListReduser
});

export default rootReducer;