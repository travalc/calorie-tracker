import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp, firebaseDatabase  } from './firebase';
import Welcome from './components/Welcome';
import App from './components/App';
import Profile from './components/Profile';
import Register from './components/Register';
import reducer from './reducers';
import { updateUser, loadProfile } from './actions';

const store = createStore(reducer);



firebaseApp.auth().onAuthStateChanged(user => {

  if (user) {
    const { email } = user;
    store.dispatch(updateUser(email));
    console.log('logged in');
    const userId = firebaseApp.auth().currentUser.uid;

    firebaseDatabase.ref('users/' + userId).on('value', snap => {
      if (snap.val() === null ) {
        firebaseDatabase.ref('users/' + userId).set({
          email
        });
        browserHistory.push('/profile');
      }
      else if (snap.val() !== null && !snap.val().profile) {
        browserHistory.push('profile');
      }
      else {
        const profileInfo = snap.val().profile;
        store.dispatch(loadProfile(profileInfo));
        browserHistory.push('/App');
      }
    })

  }
  else {
    console.log('no user found');
    browserHistory.replace('/');
  }
})


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Welcome} />
      <Route path="/App" component={App} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </Router>
  </Provider>
  , document.getElementById('root')
)
