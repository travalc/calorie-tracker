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
import Home from './components/Home';
import CurrentDay from './components/CurrentDay';
import History from './components/History';
import reducer from './reducers';
import { updateUser, loadProfile, loadHistory, submitProfile } from './actions';
import './css/index.css';

const store = createStore(reducer);



firebaseApp.auth().onAuthStateChanged(user => {

  if (user) { // User exists?
    const { email } = user;
    store.dispatch(updateUser(email)); //send current user to app state
    console.log('logged in');
    const userId = firebaseApp.auth().currentUser.uid;

    firebaseDatabase.ref('users/' + userId).on('value', snap => {
      if (snap.val() === null ) { //if user's data is not already in database
        firebaseDatabase.ref('users/' + userId).set({ //create a reference
          email
        });
        browserHistory.push('/profile'); //require user to fill out profile
      }
      else if (snap.val() !== null && !snap.val().profile) { //if user exists but hasn't filled out profile
        browserHistory.push('profile'); //require profile submission
      }
      else { //if user data and profile are in database
        const profileInfo = snap.val().profile;
        let entries = [];

        store.dispatch(loadProfile(profileInfo)); // send profile info to app state
        store.dispatch(submitProfile(false));
        snap.forEach(child => { //load previous day history from database
          if (child.key === 'entries') {
            child.forEach(entry => {
              let entryItem = entry.val();
              entryItem.key = entry.key
              entries.push(entryItem);
            })
          }
        })

        browserHistory.push('/Home');
        entries.forEach(entry => {
          const dateArray = entry.date.split(' ');
          let month = null;
          let day = null;
          let year = Number(dateArray[2]);

          function convertDate (m, d) { //convert date of entry to readable format
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
          entry.timeDiff = Date.UTC(year, month, day); //get time since epoch
        })
        entries.sort((a, b) => { //sort days from newest to oldest
          return b.timeDiff - a.timeDiff;
        });
        console.log(entries);
        store.dispatch(loadHistory(entries)); //send history to app state
      }
    })

  }
  else { //no user found? route to welcome page to reuqire login/registration
    console.log('no user found');
    browserHistory.replace('/');
  }
})


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>

      <Route path="/" component={Welcome} />

      <Route path="/App" component={App}>
        <Route path="/Home" component={Home} />
        <Route path="/CurrentDay" component={CurrentDay} />
        <Route path="/History" component={History} />
        <Route path="/profile" component={Profile} />
      </Route>
      <Route path="/register" component={Register} />

    </Router>
  </Provider>
  , document.getElementById('root')
)
