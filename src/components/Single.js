import React, { Component } from 'react';
import Photo                from './Photo';
import Comments             from './Comments';


class Single extends Component {
  render(){
    const { match, photos, comments, loading } = this.props;
    const id               = Number(match.params.id);
    const photo            = photos.find((photo) => photo.id === id);
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
