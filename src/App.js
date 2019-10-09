import React, { Component }   from 'react';
import { Route, Link }        from 'react-router-dom';

import * as photoActions      from './store/actions/photoActions'; //import { deletePhoto, addPhoto } from './store/actions/photoActions';
import * as commentActions    from './store/actions/commentActions';
import { bindActionCreators } from 'redux';


////////////////////////////////////////////////////////////////////////////////
//
//
//  The tutorial suggested that the standard practice is to pass the store
//  to the highest level component (i.e., App.js).
//  From there we would then pass the data down as props.
//  Thus data should GENERALLY go from the top down.
//  So far that doesn't really solve anything.
//  Thus there is a caveat: IF you need the data in a DEEPLY NESTED subcomponent.
//  In that case, we will inject the data directly into the subcomponent.
//  The idea here is that we don't want to be adding connect() to every single component everywhere.
//  Doing that would make the data flow more difficult to trace.
//
//  That said, if the component is sufficiently nested, we can connect the store dircectly
//  to that component.
//  This app is fairly simple, and we don't really need to inject the store in a deeply
//  nested subcomponent.
//  Suppose, however, that the Photo component was deeply nested.
//  We could connect it the Redux store like in the exact same way that we've connected
//  App.js (at the bottom of this file):
//
//    import { connect } from "react-redux";
//
//    ...
//
//    function mapStateToProps(state){
//      return { photos: state.photoReducer.photos };
//    }
//
//    export default connect(mapStateToProps, null)(Photo);
//
//
//  Redux was not made primarily to directly inject store (state) into every other component.
//  It was made so that managing the state of the application could be more predictable
//  through the use of pure functons (i.e. reducers).
//
//
////////////////////////////////////////////////////////////////////////////////

import { connect } from "react-redux";
import Photowall   from './components/Photowall';
import Addphoto    from './components/Addphoto';
import Single      from './components/Single';


class App extends Component {
  state = {
    //When the App first starts we are, indeed, loading our photos.
    //This gets passed to <Single /> below.
    loading: true
  };

  componentDidMount(){
    //Calls to firebase.


    //Presumably, the .then() works in this instance because startLoadingPhotos()
    //uses firebase which creates a Promise.
    this.props.startLoadingPhotos()
      .then(
        () => {
          //setTimeout is used merely to extend the loading demonstration.
          //setTimeout(() => {
            this.setState({ loading: false })
          //}, 1000);
        }
      )

    this.props.startLoadingComments();

  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //  Below, the render prop is used in our <Route /> components (instead of component={...}).
  //  In the first case, it is used for the purposes of rendering multiple elements/components.
  //  In the second case, it is used in order to pass props.
  //
  //  Below, the history prop is used to take us back the previous page.
  //
  ////////////////////////////////////////////////////////////////////////////////
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


                  {/* ...this.props passes down all props that exist in App
                  It's equivalent to writing:
                  photos: props.photos
                  deletePhoto: props.deletePhoto
                  etc.
                  */}
                  <Photowall { ...this.props } />
                </div>
              );
            }
          }
        />

      {/* In the tutorial there was a discussion in the "Actions (2) - Adding Posts"
      video that said that react-router and redux generally work fine.
      However, when connecting a component to a redux store with connect(), the component
      stops updating the location change.
      Consequently, clicking on the + symbol link will change the URL to http://localhost:3000/addphoto,
      but it wouldn't actually change the page.
      A fix was mad fore this by using:

         import { withRouter } from 'react-router';


      Then do this to const App = connect(mapStateToProps, mapDispatchToProps)(Main); :

         const App withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


      Note: I did not need to do this because I did not implement my project in the same
      way as the tutorial did. In other words, I don't have a <Main/> component.
      I just used App directly. This may be why I don't run into this issue.
      It could also be because I'm using react-router v5.
       */}

       {/*
         Below we could've written (same difference):
         (params) => ( <Addphoto {...this.props} history={params.history} /> )
       */}
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

      {/* When clicking on a photo <Link /> Photo.js is set up such that the url will be:

          `/single/${photo.id}`

      Whatever the specific value of photo.id is, it is accessible to us here through params:
      Below we are passing params and then destructuring (i.e., spreading) each one into a property,
      such that the name of each prop will correspond the the name of each property from params.
      params will include several things (e.g., history, match, etc.)
      */}



      {/* PLACE {...this.props} BEFORE {...params} :

      In the tutorial it seemed to have mattered that ...this.props came first.
      The reasong being that the App component's this.props also has a match object.
      By passing in all {...this.props} after {...params} (i.e., the wrong way),
      the match object from {...params} is overriden by the match object in {...this.props}.

      That said, I never had any problems either way.
      */}
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

//This will allow us to access photos as: this.props.photos and comments as this.props.comments
function mapStateToProps(state){
  //////////////////////////////////////////////////////////////////////////////
  //
  //  Note: the tutorial set the various state's to arrays in each respective reducer.
  //  And he named the reducers photos and comments
  //  In such a case, our mapStateToProps would look like this:
  //
  //    return {
  //      posts:    state.photos,    //If there is only one piece of state, you can just reference state (i.e., not state.photos)
  //      comments: state.comments
  //     }
  //
  //
  //  However, because I used ojects, my return statement looks different.
  //  It has another dot.
  //  Moreover, rather than naming the reducers photos and comments,
  //  I named them photoReducer and commentReducer.
  //  Then I named set state to an object that had a photos and comments property, respectively.
  //
  //  Both approaches work.
  //  And both have advantages and disadvantages.
  //  I like the way I've done it because it's more clear, more specific, and using objects is more flexible.
  //
  //
  //////////////////////////////////////////////////////////////////////////////


  return {
    photos:   state.photoReducer.photos,
    comments: state.commentReducer.comments
  };
}

//mapDispatchToProps is normally used to provide a shorthand inside of our
//component such that instead of writing this.props.dispatch(deletePhoto(...)), we can just
//write this.props.deletePhoto(...)
function mapDispatchToProps(dispatch){

  //return bindActionCreators({deletePhoto, addPhoto }, dispatch);
  return bindActionCreators({...photoActions, ...commentActions}, dispatch);
}

////////////////////////////////////////////////////////////////////////////////
//
//  (App) is the component that is receiving the data from the store.
//  connect() doesn't modify the component that is passed in to it.
//  Instead, it's returning a new connected component (i.e., connected to the Redux store).
//  For example in the Codepen examples I would do this:
//
//    const AppContainer = connect(mapStateToProps, null)(App);
//
//
//  However, in this case I am eliminating the need to name it.
//  Instead I am merely exporting it directly (to index.js).
//  Then in index.js we name it App: import App from './App';
//  But what is actually being rendered now is:
//
//   <Connect(App)>...</Connect(App)>
//
////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(App);
