import {combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';

import toDoListReduser from "./toDoListReduser";
import userListReduser from './userListReduser';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  toDoListReduser,
  userListReduser
});

export default rootReducer;