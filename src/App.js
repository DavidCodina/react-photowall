import React, { Component }   from 'react';
import { Route, Link }        from 'react-router-dom';
import * as photoActions      from './store/actions/photoActions';
import * as commentActions    from './store/actions/commentActions';
import { bindActionCreators } from 'redux';
import { connect }            from "react-redux";
import Photowall              from './components/Photowall';
import Addphoto               from './components/Addphoto';
import Single                 from './components/Single';


class App extends Component {
  state = {
    loading: true
  };

  componentDidMount(){
    this.props.startLoadingPhotos()
      .then(
        () => {
            this.setState({ loading: false })
        }
      )
    this.props.startLoadingComments();
  }

  render(){
    return (
      <React.Fragment>
        <header>
          <h1>
            <Link to="/">Photowall></Link>
          </h1>
        </header>

        <Route
          exact
          path="/"
          render={
            () => {
              return (
                <div>
                  <Photowall { ...this.props } />
                </div>
              );
            }
          }
        />

        <Route
          path="/addphoto"
          render={
            ( {history} ) => {
              return (
                <Addphoto {...this.props} history={history} />
              );
            }
          }
        />

        <Route
          path="/single/:id"
          render={
            (params) => {
              return (
                <Single loading={this.state.loading} {...this.props} {...params} />
              );
            }
          }
        />
      </React.Fragment>
    );
  }
}


function mapStateToProps(state){
  return {
    photos:   state.photoReducer.photos,
    comments: state.commentReducer.comments
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({...photoActions, ...commentActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
