
//Add { applyMiddleware, compose } to the list if you want to use thunk from redux-thunk as well.*
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//Here we are importing the rootReducer from "./reducers/index.js"
import rootReducer from "./reducers";


const initialState = {};
const middleware   = [thunk];


//A basic store if you don't need middleware
//const store = createStore(rootReducer, initialState);


//As store that uses the redux dev tool.
// const store = createStore(
//   rootReducer,
//   initialState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );


//A store that uses several pieces of middleware
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
