 import React, { Component }    from 'react';
//import PropTypes from 'prop-types';


class Addphoto extends Component {
  //////////////////////////////////////////////////////////////////////////////
  //
  //  Note:
  //  Ordinarily, I might create a:
  //
  //    onChange = e => this.setState({ [e.target.name]: e.target.value });
  //
  //
  //  This would correspond to state properties matching the name attributes in the input elements.
  //  Moreover, each input would have onChange={this.onChange}
  //  However the tutorial did not do it this way.
  //  Instead it did this:
  //
  //////////////////////////////////////////////////////////////////////////////


  handleSubmit = (e) => {
    e.preventDefault();
    const description = e.target.elements.description.value;
    const imageLink   = e.target.elements.link.value;

    //The value of the id property is a unix time stamp converted to a number (e.g., 1570312242552).
    //This will allow us to order the images by number (larger numbers representing more recently added images).
    const data        = { id: Number(new Date()), description, imageLink };
    console.log(data);

    if (imageLink && description){
      this.props.startAddingPhoto(data);
      this.props.history.push('/');
    }
  }

  //Test the form:
  //first input: https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg
  //description: Pretty mountains!
  render(){
    return (
      <React.Fragment>


        <div className="addphoto-form-container">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="link"        placeholder="Image link..."/>
            <input type="text" name="description" placeholder="Description..."/>
            <button className="form-button">Submit</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}


//Photo.propTypes = {};

export default Addphoto;
