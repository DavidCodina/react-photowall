import React, { Component } from 'react';


class Comments extends Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const comment = e.target.elements.comment.value;

    ////////////////////////////////////////////////////////////////////////////
    //
    //  Note: anytime an action creator emits an action it goes to every single reducer.
    //  This is normal behavior.
    //  Thus if we put these in the photoReducer and the commentReducer, respectively:
    //
    //     console.log("photoReducer called with action: " , action);
    //     console.log("commentReducer called with action: " , action);
    //
    //
    //  They would both get invoked.
    //  However, only commentReducer has a switch that evaluates ADD_COMMENT.
    //  Thus, when photoReducer gets the action, it merely defaults to returning state the state
    //  of photos (unchanged).
    //
    //  The important takeaway here is that each reducer should handle distinct action types.
    //  If for some reason they share an action type, you should make sure that's what you intended.
    //
    ////////////////////////////////////////////////////////////////////////////


    this.props.startAddingComment(comment, this.props.id);

    //Clear the form;
    e.target.elements.comment.value = '';
  }


  render() {
    return (
      <div className="comment">
        {
          this.props.photoSpecificComments.map(
            (comment, index) => {
              return <p key={index}> {comment} </p>;
            }
          )
        }

        <form className="comment-form" onSubmit={this.handleSubmit }>
          <input type="text" placeholder="Comment on image..." name="comment" />
          <input type="submit" hidden/>
        </form>
      </div>
    );
  }
}


export default Comments;
