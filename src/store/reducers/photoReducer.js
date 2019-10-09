
import { DELETE_PHOTO, ADD_PHOTO, LOAD_PHOTOS } from "../actions/types";

const initialState = {
  photos: []
};



export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter(
          photo => photo.id !== action.payload
        )
      };

      case ADD_PHOTO:
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
