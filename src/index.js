import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import Welcome from './components/Welcome';
import Log from './components/Log';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import Register from './components/Register';

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('logged in');
    browserHistory.push('/log');
  }
  else {
    console.log('no user found');
    browserHistory.replace('/');
  }
})

//const store = createStore(reducer);

ReactDOM.render(
  //<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Welcome} />
      <Route path="/log" component={Log} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </Router>
  //</Provider>
  , document.getElementById('root')
)
