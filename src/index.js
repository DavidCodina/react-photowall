import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { HashRouter } from 'react-router-dom';


//Note: Brad typically imports this into App.js and wraps it
//around the content in the return statement of the App component.
import { Provider }      from 'react-redux';
import store             from './store/store';
import App               from './App';
import './styles/style.css';


//The actual tutorial renders <Main />
//I render <App />, and <App/> returns <Main />
ReactDOM.render(
  <Provider store={store}>
    <HashRouter><App /></HashRouter>
  </Provider>,
  document.getElementById('root')
);
