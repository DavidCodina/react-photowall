//Note in the tutorial he actually named the parent directory: 'redux'

import { combineReducers } from "redux";
import photoReducer        from "./photoReducer";
import commentReducer      from "./commentReducer";


//We will create a reducer for every distinct piece of state.
//That reducer will be in charge of updating that piece of state.
//Since I am prepending export default, but you can also do:
//
//  const rootReducer = combineReducers(...)
//  export default rootReducer;
//
//
//Rather I give it the name of rootReducer on import.
//However, you could do it the other way around.

export default combineReducers({
  photoReducer:   photoReducer,
  commentReducer: commentReducer
});
