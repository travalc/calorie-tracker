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
          <div className="w3-bar-item w3-button"><Link to={'/Home'}>Home</Link></div>
          <div className="w3-bar-item w3-button"><Link to={'/CurrentDay'}>Current Day</Link></div>
          <div className="w3-bar-item w3-button"><Link to={'/History'}>History</Link></div>
          <div className="w3-bar-item w3-button"><Link to={'/profile'}>Update Profile</Link></div>
          <div className="w3-bar-item w3-button">
            <Link to={'/'}
              onClick={() => this.signOut()}
            >
              Sign Out
            </Link>
          </div>
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
