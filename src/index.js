import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import Log from './components/Log';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import Register from './components/Register';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/log" component={Log} />
      <Route path="/profile" component={Profile} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
    </Router>
  </Provider>
)
