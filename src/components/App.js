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
        <nav className="w3-bar w3-black">
          <Link to={'/Home'} className="w3-bar-item w3-button w3-mobile">Home</Link>
          <Link to={'/CurrentDay'} className="w3-bar-item w3-button w3-mobile">Current Day</Link>
          <Link to={'/History'} className="w3-bar-item w3-button w3-mobile">History</Link>
          <Link to={'/profile'} className="w3-bar-item w3-button w3-mobile">Update Profile</Link>
          <Link to={'/'}
              className="w3-bar-item w3-button w3-mobile"
              onClick={() => this.signOut()}
            >
              Sign Out
          </Link>

        </nav>
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
