import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import AboutSection from './AboutSection';
import CurrentDay from './CurrentDay';

class App extends Component {
  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    console.log(this.props.state);
    return (
      <div>
        <AboutSection profile={this.props.state.profile} />
        <hr />
        <CurrentDay foods={this.props.state.currentDayFoods}/>
        <hr />
        <button
          className="btn btn-danger"
          onClick={() => this.signOut()}
        >
          Sign Out
        </button>
        <div><Link to={'/profile'}>Update Profile</Link></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, null)(App);
