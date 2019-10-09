import { combineReducers } from "redux";
import photoReducer        from "./photoReducer";
import commentReducer      from "./commentReducer";


export default combineReducers({
  photoReducer:   photoReducer,
  commentReducer: commentReducer
});
