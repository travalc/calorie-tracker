import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../firebase';

class Log extends Component {
  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    console.log(this.props);
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

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, null)(Log);
