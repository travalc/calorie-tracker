import React, { Component } from 'react';
import { firebaseApp, firebaseDatabase } from '../firebase';
import { browserHistory } from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      sex: '',
      feet: '',
      inches: '',
      weight: '',
      target: '',
    }
  }

  componentDidMount() {
    const userId = firebaseApp.auth().currentUser.uid;
    let userInfo = '';
    firebaseDatabase.ref('users/' + userId ).once('value', snap => {
      userInfo = snap.val();
      if (userInfo.hasOwnProperty('profile')) {
        this.setState ({
          name: userInfo.profile.name,
          age: userInfo.profile.age,
          sex: userInfo.profile.sex,
          feet: userInfo.profile.height.feet,
          inches: userInfo.profile.height.inches,
          weight: userInfo.profile.weight,
          target: userInfo.profile.target
        });
        console.log(this.state);
      }
    })
  }

  updateProfile() {
    const userId = firebaseApp.auth().currentUser.uid;
    const profile = {
      name: this.state.name,
      age: this.state.age,
      sex: this.state.sex,
      height: {
        feet: this.state.feet,
        inches: this.state.inches
      },
      weight: this.state.weight,
      target: this.state.target
    }
    firebaseDatabase.ref('users/' + userId).update({ profile });
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
            value={this.state.name}
            onChange={event => this.setState({name: event.target.value})}
          />
          <label>Age:</label>
          <input
            className="form-control"
            placeholder="ex. 30"
            value={this.state.age}
            onChange={event => this.setState({age: event.target.value})}
          />
          <label>Sex:</label>
          <select
            value={this.state.sex}
            onChange={event => this.setState({sex: event.target.value})}
          >
            <option value={null}>-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <label>Height:</label>
          <div className="form-inline">
            <input
              className="form-control"
              placeholder="feet"
              value={this.state.feet}
              onChange={event => this.setState({feet: event.target.value})}
            />
            <input
              className="form-control"
              placeholder="inches"
              value={this.state.inches}
              onChange={event => this.setState({inches: event.target.value})}
            />
          </div>
          <label>Current Weight:</label>
          <input
            className="form-control"
            placeholder="weight in pounds"
            value={this.state.weight}
            onChange={event => this.setState({weight: event.target.value})}
          />
          <label>Target Daily Caloric Intake:</label>
          <input
            className="form-control"
            placeholder="ex. 2000"
            value={this.state.target}
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
