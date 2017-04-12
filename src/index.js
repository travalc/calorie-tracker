import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp, firebaseDatabase  } from './firebase';
import Welcome from './components/Welcome';
import Log from './components/Log';
import Profile from './components/Profile';
import Register from './components/Register';
import reducer from './reducers';
import { updateUser } from './actions';

const store = createStore(reducer);



firebaseApp.auth().onAuthStateChanged(user => {

  if (user) {
    const { email } = user;
    store.dispatch(updateUser(email));
    console.log('logged in');
    const userId = firebaseApp.auth().currentUser.uid;

    firebaseDatabase.ref('users/' + userId).once('value', snap => {
      if (snap.val() === null ) {
        console.log(snap.val());
        firebaseDatabase.ref('users/' + userId).set({
          email
        });
        browserHistory.push('/profile');
      }
      else if (snap.val() !== null && !snap.val().target) {
        browserHistory.push('profile');
      }
      else {
        console.log(snap.val().target);
        browserHistory.push('/log');
      }
    })

  }
  else {
    console.log('no user found');
    browserHistory.replace('/register');
  }
})


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Welcome} />
      <Route path="/log" component={Log} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </Router>
  </Provider>
  , document.getElementById('root')
)
