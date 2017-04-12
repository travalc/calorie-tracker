import React, { Component } from 'react';
import { firebaseApp, firebaseDatabase } from '../firebase';
import { browserHistory } from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null
    }
  }

  updateProfile() {
    const userId = firebaseApp.auth().currentUser.uid;
    firebaseDatabase.ref('users/' + userId).update({target: this.state.target });
    browserHistory.push('/log');
  }

  render() {
    return (
      <div>
        <h4>Please complete your profile (you can update this any time)</h4>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            placeholder="First + Last"
          />
          <label>Age:</label>
          <input
            className="form-control"
            placeholder="ex. 30"
          />
          <label>Sex:</label>
          <select>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <label>Height:</label>
          <div className="form-inline">
            <input
              className="form-control"
              placeholder="feet"
            />
            <input
              className="form-control"
              placeholder="inches"
            />
          </div>
          <label>Current Weight:</label>
          <input
            className="form-control"
            placeholder="weight in pounds"
          />
          <label>Target Daily Caloric Intake:</label>
          <input
            className="form-control"
            placeholder="ex. 2000"
            onChange={event => this.setState({target: event.target.value})}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.updateProfile()}
          >
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default Profile;
