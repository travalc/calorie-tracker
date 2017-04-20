import React, { Component } from 'react';
import { firebaseApp, firebaseDatabase } from '../firebase';

class History extends Component {
  mapHistory() {
    const userId = firebaseApp.auth().currentUser.uid;
    firebaseDatabase.ref('users/' + userId + '/entries').on('value', snap =>{
      console.log(snap.val());
    });
  }
  render() {
    return (
      <div>
        <button type="button" onClick={() => this.mapHistory()}>
          test
        </button>
      </div>
    )
  }
}

export default History;
