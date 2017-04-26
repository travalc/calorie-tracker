import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitProfile, loadProfile } from '../actions';
import { firebaseApp, firebaseDatabase } from '../firebase';
import { Link } from 'react-router';

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
      activityLevel: '',
      goal: ''
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
        activityLevel: this.props.state.profile.activityLevel,
        goal: this.props.state.profile.goal
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
      target: this.state.target,
      activityLevel: this.state.activityLevel,
      goal: this.state.goal
    }
    firebaseDatabase.ref('users/' + userId).update({ profile });
    this.props.submitProfile(false);

  }

  render() {
    console.log(this.props);
    console.log(this.state);
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
          <label>Sex: </label>
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
          <label>Activity Level: </label>
          <select
            value={this.state.activityLevel}
            onChange={event => this.setState({activityLevel: event.target.value})}
          >
            <option value={null}>-</option>
            <option value="sedentary">sedentary</option>
            <option value="lightly active">lightly active</option>
            <option value="moderately active">moderately active</option>
            <option value="very active">very active</option>
            <option value="extra active">extra active</option>
          </select>
          <br />
          <label>Goal (Per Week):</label>
          <select
            value={this.state.goal}
            onChange={event => this.setState({goal: event.target.value})}
          >
            <option value={null}>-</option>
            <option value="lose 1 pound">lose 1 pound</option>
            <option value="lose 2 pounds">lose 2 pounds</option>
            <option value="gain 1 pound">gain 1 pound</option>
            <option value="gain 2 pounds">gain 2 pounds</option>
          </select>
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
                <div><Link to={'/App'}>Cancel</Link></div>
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
