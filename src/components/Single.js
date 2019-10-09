import React, { Component } from 'react';
import Photo                from './Photo';
import Comments             from './Comments';


//This can be converted to a function component.
class Single extends Component {

  render(){

    ////////////////////////////////////////////////////////////////////////////
    //
    //  console.log(this.props.match);
    //  Logs something like the following:
    //
    //     {
    //       isExact: true,
    //       params:  {id: "2"},
    //       path:    "/single/:id",
    //       url:     "/single/2"
    //     }
    //
    //  Thus what are after is this.props.match.params.id
    //  With that id, we can get the corresponding state.photos array element
    //
    ////////////////////////////////////////////////////////////////////////////


    const { match, photos, comments, loading } = this.props;
    const id               = Number(match.params.id);
    const photo            = photos.find((photo) => photo.id === id);




    //Initially, specificComments will be undefined (i.e., when Single.js renders a photo without comments).
    //This would break the code when we try to map over it in Comments.js
    //For this reason, instead of merely doing this:
    //const photoSpecificComments = this.props.comments[id];
    //We do this:
    const photoSpecificComments = comments[id] || [];


    if (loading === true){
      return <div className="loader">Loading...</div>;
    } else if (photo) {
      return (
        <main>
          <div className="single-photo-container">
            <Photo photo={photo} {...this.props} />

            <Comments
              startAddingComment={this.props.startAddingComment}
              photoSpecificComments={photoSpecificComments}
              id={id}
            />
          </div>
        </main>
      );
    } else {
      return <h2 className="no-photo-found">...no photo found.</h2>
    }
  }
}

export default Single;
