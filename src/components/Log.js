import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class Log extends Component {
  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    return (
      <div>
        <h2>Log</h2>
        <button
          className="btn btn-danger"
          onClick={() => this.signOut()}
        >
          Sign Out
        </button>
      </div>
    )
  }
}

export default Log;
