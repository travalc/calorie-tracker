import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitProfile, loadProfile } from '../actions';
import { firebaseApp, firebaseDatabase } from '../firebase';
import { browserHistory, Link } from 'react-router';

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
    if (this.props.state.profile.hasOwnProperty('target')) {
      this.props.submitProfile(false);
      this.setState ({
        name: this.props.state.profile.name,
        age: this.props.state.profile.age,
        sex: this.props.state.profile.sex,
        feet: this.props.state.profile.feet,
        inches: this.props.state.profile.inches,
        weight: this.props.state.profile.weight,
        target: this.props.state.profile.target,
      });
    }

  }

  updateProfile() {
    const userId = firebaseApp.auth().currentUser.uid;
    const profile = {
      name: this.state.name,
      age: this.state.age,
      sex: this.state.sex,
      feet: this.state.feet,
      inches: this.state.inches,
      weight: this.state.weight,
      target: this.state.target
    }
    firebaseDatabase.ref('users/' + userId).update({ profile });
    this.props.submitProfile(false);

  }

  render() {
    console.log(this.props);
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
          <div className="form-inline">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.updateProfile()}
            >
              Save
            </button>

            {
              this.props.state.newUser === false
              ?
                <div><Link to={'/Main'}>Cancel</Link></div>
              :
                <div></div>
            }

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, { submitProfile, loadProfile })(Profile);
