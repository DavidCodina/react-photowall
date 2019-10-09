import React     from 'react';
import PropTypes from 'prop-types';
import  { Link } from 'react-router-dom';


function Photo(props) {
  const { photo, startDeletingPhoto } = props;

  return (
    <figure className="figure">
      <Linkvto={`/single/${photo.id}`}>
        <img className="photo" src={photo.imageLink} alt={photo.description} />
      </Link>

      <figcaption>
        {photo.description}
      </figcaption>

      <div className="button-container">
        <button
          className="button"
          onClick={
            () => {
              startDeletingPhoto(photo.id);
              if (props.history) { props.history.push("/"); }
            }
          }
        > Remove </button>

        <Link className="button" to={`/single/${photo.id}`}>
          <div className="comment-count">
            <div className="speech-bubble"></div>
            {props.comments[photo.id] ? props.comments[photo.id].length : 0}
          </div>
        </Link>
      </div>
    </figure>
  );
}


Photo.propTypes = {
  photo: PropTypes.object.isRequired
};

export default Photo;
