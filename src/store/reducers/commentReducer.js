import { ADD_COMMENT, LOAD_COMMENTS } from "../actions/types";


const initialState = {
  comments: {}
};


export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:

      //////////////////////////////////////////////////////////////////////////
      //
      //  Tutorial Version:
      //
      //  action.payload here represents { id: ..., comment: ...}
      //  Thus the state.comments property represents an object whereby
      //  the property names are numbers that correspond to the ids in state.photos.
      //  Each id in state.comments contains an array of comments.
      //
      //////////////////////////////////////////////////////////////////////////


      //If there is no corresponding property in comments with the current id, then return the following:
      if ( !state.comments[action.payload.id] ){
        return {
          ...state,
          //Note: [action.payload.id] is NOT an array.
          //Rather, it's how ES6 allows us to create an object property in this context.
          //Conversely, [action.payload.comment] IS an array.
          comments: {
            ...state.comments, [action.payload.id] : [action.payload.comment]
          }
        }

      //If ther IS a corresponding property in comments with the current id, then return the following:
      } else {
        return {
          ...state,
          comments: {
            ...state.comments, [action.payload.id] : [...state.comments[action.payload.id], action.payload.comment]
            //Note: you want the action.payload.comment to be second. Why?
            //Because we want it to be a comment stream, with newer comments below older comments.
          }
        }
      }

      //////////////////////////////////////////////////////////////////////////
      //
      //  My original solution (same difference):
      //
      //
      //  previousComments represents all previous comments corresponding to the id.
      //  Fore example 567 might have ["comment 1", "comment 2", ...] :
      //
      //    comments: {
      //      567: ["comment 1", "comment 2", ...]
      //    }
      //
      //
      //  I was running into problems below when I tried to ...previousComments.
      //  This was because on the first run through previousComments would be undefined,
      //  and therefore not iterable. Consequently, trying to use ...previousComments in the return.
      //  was breaking the code.
      //
      //  The solution is to set previousComments to an empty array when it is initially undefined:
      //
      //////////////////////////////////////////////////////////////////////////


      // let previousComments = state.comments[action.payload.id];
      //
      // if (previousComments === undefined) {
      //   previousComments = [];
      // }
      //
      // return {
      //   ...state,
      //   comments: {
      //     ...state.comments, [action.payload.id] : [...previousComments, action.payload.comment]
      //   }
      // };



    case LOAD_COMMENTS:
      //the action.payload should have a structure in which it is an object.
      //That object having various numbers as properties, and each of those keys/properties
      //has a value of an array of strings.
      //1570497435602: ["I love this building", "It's so dusty"]

      return {
        ...state,
        comments: action.payload
      };

    default:
      return state;
  }
}
