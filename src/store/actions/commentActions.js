import { ADD_COMMENT, LOAD_COMMENTS } from "./types";
import { database }    from '../../database/config';


/* ===============================
 loadComments , startLoadingComments
=============================== */


export const loadComments = (comments) => {
  return { type: LOAD_COMMENTS, payload: comments };
};



export const startLoadingComments = () => (dispatch) => {
  //console.log("startLoadingComments() called.")
  return database
    .ref('comments')
    .once('value')
    .then(
      (snapshot) => {
        //When we loaded photos we made: let photos = [];
        //However, here we will be adding them to an object.
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
            .ref(`comments/${id}`) //or .ref('comments/+id')

            ////////////////////////////////////////////////////////////////////
            //
            //  push() will append our comment within/under the node such that
            //  the comment will have a key of some firebase auto-generated unique id.
            //  If you don't give each comment a unique id with push(), then they will
            //  end up overwriting themselves in the database.
            //
            //  Note: Addphoto.js is still using id: Number(new Date()) for the id,
            //  As far as I know, the comment also uses this id, so why employ an
            //  auto-generated unique id?
            //  Why use push()?
            //  Why not just use update()
            //
            //  So what actually happens in firebase is that the properties of the comments
            //  object are assigned an id corresponding to the id of the photo.
            //  (e.g., the timestamp converted to a number).
            //  However, the associated value no longer holds an array (at least not in the firebase.
            //  Instead, it contains a series of sub-nodes.
            //  And it is those sub-nodes that require a unique identifier:
            //
            //    comments
            //      15705535780
            //        LqgUYEcvksgCkKmrxq7
            //        LqgU_gq6IfVjHBI3waD
            //
            //
            ////////////////////////////////////////////////////////////////////

            .push(comment)
            .then(
              () => { dispatch(addComment(comment, id)) }
            )
            .catch(
              (error) => { console.log(error) }
            );
};
