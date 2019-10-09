 import React, { Component }    from 'react';
//import PropTypes from 'prop-types';


class Addphoto extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const description = e.target.elements.description.value;
    const imageLink   = e.target.elements.link.value;
    const data        = { id: Number(new Date()), description, imageLink };


    if (imageLink && description){
      this.props.startAddingPhoto(data);
      this.props.history.push('/');
    }
  }

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
