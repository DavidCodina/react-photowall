import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';
import Photo     from './Photo';


function Photowall(props) {

  return (
    <React.Fragment>
      <Link className="plus-button" to="/addphoto"></Link>
      <div className="photo-container">
        {
          //Before mapping over the photos array, we will first sort it according to the id property
          //The id property is set to a value representing a unix timestamp converted to a number.
          //Consequently, more recent photos are represented by larger numbers.

          props.photos
            .sort(function(x,y){
              //sort in descending order.
              return y.id - x.id;
            })
            .map(
              (photo, index) => {
                return ( <Photo key={index} photo={photo} {...props} /> );
              }
          )
        }
      </div>
    </React.Fragment>
  );
}

Photowall.propTypes = {
  photos: PropTypes.array.isRequired
};

export default Photowall;
