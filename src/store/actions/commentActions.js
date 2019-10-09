import { ADD_COMMENT, LOAD_COMMENTS } from "./types";
import { database }    from '../../database/config';


/* ===============================
 loadComments , startLoadingComments
=============================== */


export const loadComments = (comments) => {
  return { type: LOAD_COMMENTS, payload: comments };
};

export const startLoadingComments = () => (dispatch) => {
  return database
    .ref('comments')
    .once('value')
    .then(
      (snapshot) => {
        let comments = {};
        snapshot.forEach(
          (childSnapshot) => {
            comments[childSnapshot.key] = Object.values(childSnapshot.val())
          }
        );
        dispatch(loadComments(comments));
      }
    )
    .catch(
      (error) => { console.log(error) }
    );
};


/* ===============================

=============================== */


export const addComment = (comment, id) => {
  return {
    type: ADD_COMMENT,
    payload: {
      id: id,
      comment: comment
    }
  };
};

export const startAddingComment = (comment, id) => (dispatch) => {
  return  database
            .ref(`comments/${id}`)
            .push(comment)
            .then(
              () => { dispatch(addComment(comment, id)) }
            )
            .catch(
              (error) => { console.log(error) }
            );
};
