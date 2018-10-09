import { combineReducers } from 'redux';
import toDoListReduser from './toDoListReduser';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  toDoListReduser,
});

export default rootReducer;