import React     from 'react';
import PropTypes from 'prop-types';
import  { Link } from 'react-router-dom';


function Photo(props) {
  const { photo, startDeletingPhoto } = props;
  //////////////////////////////////////////////////////////////////////////////
  //
  //  When we delete the photo from within Single.js
  //  We get: TypeError: Cannot read property 'id' of undefined.
  //  This is because the id it's looking for has been deleted.
  //  To get around this, we add props.history.push('/') to
  //  the Remove button's onClick.
  //
  //  -
  //
  //  Note: When Photo is implemented from within Single it still has this <Link />
  //  wrapper around the image. However, clicking on it won't do anything
  //  because we're already on that page. Fortunately, it doesn't even refresh the page.
  //
  //  Ideally, it would be nice to conditionally render the <img> with or without the <Link/>
  //  wrapper depending on what parent implemented it.
  //
  //  In order to implement this idea, we can pass a prop from Single to
  //  Photo: <Photo isSingle={true} />, then do this in the return below:
  //
  //    { !isSingle && <img className="photo" src={photo.imageLink} alt={photo.description} /> }
  //    { isSingle  && (
  //      <Link to={`/single/${photo.id}`}>
  //        <img className="photo" src={photo.imageLink} alt={photo.description} />
  //      </Link>
  //      )
  //    }
  //
  //  However, for now I will leave it as it is.
  //
  //////////////////////////////////////////////////////////////////////////////


  //When specifying url fragments, be sure to prepend the beginning backslash: `/single/${photo.id}`
  return (
    <figure className="figure">
      <Link
        to={`/single/${photo.id}`}
      >
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

              //Additional feature to be implemented later.
              //startDeletingComment(photo.id)


              //When Photo is rendered from withing Single.js, and we remove the photo,
              //it causes a crash. The solution is to call props.history.push("/");
              //To redirect to the Home page.
              //
              //However, when Photo is rendered initially from within Photowall,
              //this can create problems becuase props.history doesn't exist.
              //
              //For some reason this was not an issue in the tutorial.
              //However, it makes sense that it is.
              //Initially, there is no props.history.
              //Consequently, when we first try to remove a photo from the Photowall,
              //we would get an error.
              //I think the tutorial didn't do this at all.
              if (props.history) { props.history.push("/"); }

              //The application will now take us back to the Photowall / Home page.
              //However, if we were to then click on the back button in the browser
              //it would break the application: TypeError: Cannot read property 'id' of undefined
              //Thus in Single.js we do this:

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
