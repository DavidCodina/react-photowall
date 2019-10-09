import { ADD_COMMENT, LOAD_COMMENTS } from "../actions/types";


const initialState = {
  comments: {}
};


export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:

      if ( !state.comments[action.payload.id] ){
        return {
          ...state,
          comments: {
            ...state.comments, [action.payload.id] : [action.payload.comment]
          }
        }
      } else {
        return {
          ...state,
          comments: {
            ...state.comments, [action.payload.id] : [...state.comments[action.payload.id], action.payload.comment]
          }
        }
      }

    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };

    default:
      return state;
  }
}
