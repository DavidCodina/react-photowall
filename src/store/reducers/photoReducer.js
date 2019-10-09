
import { DELETE_PHOTO, ADD_PHOTO, LOAD_PHOTOS } from "../actions/types";



////////////////////////////////////////////////////////////////////////////////
//
//  The reducer will take the state (i.e., current state) as the first argument.
//  However, it will initially take the initial state, which we define here.
//  The reducer is responsible for updating state.
//
////////////////////////////////////////////////////////////////////////////////
const initialState = {
  photos: []
};

//////////////////////////////////////////////////////////////////////////////
//
//  In this case we are using an anonymous function.
//  Thus when we import it into the rootReducer file (i.e., index.js in this directory),
//  we name it when bringing it in: import photoReducer from "./photoReducer";
//  However, we could name the function here: function photoReducer() { ... }
//  Then: export default photoReducer;
//  This is being imported into the rootReducer in the index.js file in this same directory.
//
//////////////////////////////////////////////////////////////////////////////


export default function(state = initialState, action) {


  //////////////////////////////////////////////////////////////////////////////
  //
  //  In App.js we did this as a test:
  //
  //     componentDidMount(){
  //       this.props.dispatch(deletePhoto(1));
  //     }
  //
  //  Initially this will return undefined.
  //  This is because when the reducer first gets called upon store creation we're trying
  //  to console.log() the id of the removed action, but it's not being emitted at that time.
  //  But then once the component mounts, the above method is called, and dispatch executes
  //  the action creator, which then emits the action to the reducer.
  //
  //////////////////////////////////////////////////////////////////////////////
  // console.log("photoReducer.js received the action.payload of:");
  // console.log(action.payload);
  // console.log("");


  switch (action.type) {

    case DELETE_PHOTO:
      //console.log("case: DELETE_PHOTO");
      //////////////////////////////////////////////////////////////////////////////
      //
      //  In the tutorial he used index as the action.payload.
      //  Thus he was able to do this:
      //
      //    all elements before                  , all elements after
      //    return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
      //
      //  However, that doesn't make a lot of sense to me.
      //  Why is he returning an array?
      //  And why is he using state and not state.photos?
      //  I think it has to do with the dopey way he set it up initially.
      //  I think some people initialize state as an array. I'm not sure why.
      //  I wouldn't worry about it, just do this instead.
      //
      //////////////////////////////////////////////////////////////////////////////

      return {
        ...state,
        photos: state.photos.filter(
          photo => photo.id !== action.payload
        )
      };

      case ADD_PHOTO:
        //console.log("case: ADD_PHOTO");
        return {
          ...state,
          photos: [action.payload, ...state.photos]
        };

        case LOAD_PHOTOS:
          return {
            ...state,
            photos: action.payload
          };
    default:
      return state;
  }
}
