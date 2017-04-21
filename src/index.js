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
import { updateUser, loadProfile, loadHistory } from './actions';

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
        let entries = [];

        store.dispatch(loadProfile(profileInfo));

        snap.forEach(child => {
          if (child.key === 'entries') {
            child.forEach(entry => {
              let entryItem = entry.val();
              entryItem.key = entry.key
              entries.push(entryItem);
            })
          }
        })

        browserHistory.push('/App');
        entries.forEach(entry => {
          const dateArray = entry.date.split(' ');
          let month = null;
          let day = null;
          let year = Number(dateArray[2]);

          function convertDate (m, d) {
            switch (m) {
              case 'January':
                month = 0;
                break;
              case 'February':
                month = 1;
                break;
              case 'March':
                month = 2;
                break;
              case 'April':
                month = 3;
                break;
              case 'May':
                month = 4;
                break;
              case 'June':
                month = 5;
                break;
              case 'July':
                month = 6;
                break;
              case 'August':
                month = 7;
                break;
              case 'September':
                month = 8;
                break;
              case 'October':
                month = 9;
                break;
              case 'November':
                month = 10;
                break;
              case 'December':
                month = 11;
                break;
              default:
                month = null
            }
            day = Number(d.slice(0, -2));
          }
          convertDate(dateArray[0], dateArray[1]);
          entry.timeDiff = Date.UTC(year, month, day);
        })
        entries.sort((a, b) => {
          return b.timeDiff - a.timeDiff;
        });
        console.log(entries);
        store.dispatch(loadHistory(entries));
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
