import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';

class App extends Component {
  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    console.log(this.props.state);
    return (
      <div>


        <button
          className="btn btn-danger"
          onClick={() => this.signOut()}
        >
          Sign Out
        </button>
        <div><Link to={'/AboutSection'}>About</Link></div>
        <div><Link to={'/CurrentDay'}>Current Day</Link></div>
        <div><Link to={'/History'}>History</Link></div>
        <div><Link to={'/profile'}>Update Profile</Link></div>

        {this.props.children}
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
