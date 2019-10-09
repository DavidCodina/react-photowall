////////////////////////////////////////////////////////////////////////////////
//
//  This file contains all of the photo action creators (i.e., functions)
//  Action creators return actions, which are objects.
//  The object always has an type property and almost always has a payload (i.e., data) property.
//
////////////////////////////////////////////////////////////////////////////////


import { DELETE_PHOTO, ADD_PHOTO, LOAD_PHOTOS } from "./types";
import { database } from '../../database/config';



/* ===============================
 loadPhotos , startLoadingPhotos
=============================== */


export const loadPhotos = (photos) => {
  return { type: LOAD_PHOTOS, payload: photos };
};

export const startLoadingPhotos = () => (dispatch) => {
  console.log("database");
  console.log(database);
  return database
    .ref('photos')
    .once('value')
    .then(
      (snapshot) => {
        let photos = [];
        snapshot.forEach(
          (childSnapshot) => { photos.push(childSnapshot.val()) }
        );
        dispatch(loadPhotos(photos));
      }
    )
    .catch(
      (error) => { console.log(error) }
    );
};


/* ===============================
   addPhoto , startAddingPhoto
=============================== */



export const addPhoto = (photo) => {
  return { type: ADD_PHOTO, payload: photo };
};


export const startAddingPhoto = (photo) => (dispatch) => {
  return  database
            .ref('photos')
            .update({[photo.id] : photo})
            .then(
              () => { dispatch(addPhoto(photo)) }
            )
            .catch(
              (error) => { console.log(error) }
            );
};


/* ===============================
 deletePhoto , startDeletingPhoto
=============================== */


//The tutorial used the index, and not the id.
//But that's kind of dopey in my opinion.
//Note this will be imported into...
//Then we use this.props.dispatch(deletePhoto) to send it to the reducer.
export const deletePhoto = (id) => {
  return { type: DELETE_PHOTO, payload: id };
};


export const startDeletingPhoto = (id) => (dispatch) => {
  return  database
            .ref(`photos/${id}`)
            .remove()
            .then(
              () => {
                dispatch(deletePhoto(id))
              }
            )
            .catch(
              (error) => { console.log(error) }
            );
};
