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
    if (this.props.state.profile.hasOwnProperty('name')) { //sets default value for fields if data already exits in database
      this.props.submitProfile(false);
      this.setState ({
        name: this.props.state.profile.name,
        age: this.props.state.profile.age,
        sex: this.props.state.profile.sex,
        feet: this.props.state.profile.feet,
        inches: this.props.state.profile.inches,
        weight: this.props.state.profile.weight,
        activityLevel: this.props.state.profile.activityLevel,
        goal: this.props.state.profile.goal
      });
    }

  }

  updateProfile() { //Submits profile data to database
    const userId = firebaseApp.auth().currentUser.uid;
    const profile = {
      name: this.state.name,
      age: this.state.age,
      sex: this.state.sex,
      feet: this.state.feet,
      inches: this.state.inches,
      weight: this.state.weight,
      activityLevel: this.state.activityLevel,
      goal: this.state.goal
    }
    firebaseDatabase.ref('users/' + userId).update({ profile });
    this.props.submitProfile(false);

  }

  signOut() {
    firebaseApp.auth().signOut();
    Location.reload();
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="Profile">
        <div className="profile-content">
          {
            this.props.state.profile.name === null
              ?
                <h4 className="profile-title">Please complete your profile, it is required. (you can update this any time)</h4>
              :
                <h2><strong className="profile-title">Your Profile</strong></h2>
          }
          <div className="profile-fields">
            <div className="form-group">
              <label>Name:</label>
              <input
                className="form-control profile-input profile-input-field"
                placeholder="First + Last"
                value={this.state.name}
                onChange={event => this.setState({name: event.target.value})}
              />
              <label>Age:</label>
              <input
                className="form-control profile-input profile-input-field"
                placeholder="ex. 30"
                value={this.state.age}
                onChange={event => this.setState({age: event.target.value})}
              />
              <label>Sex: </label>
              <select
                className="profile-input"
                value={this.state.sex}
                onChange={event => this.setState({sex: event.target.value})}
              >
                <option value={null}>-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <br />
              <label>Height (in feet and inches):</label>
              <div className="form-inline">
                <input
                  className="form-control profile-input height-input"
                  placeholder="feet"
                  value={this.state.feet}
                  onChange={event => this.setState({feet: event.target.value})}
                />
                <input
                  className="form-control profile-input height height-input"
                  placeholder="inches"
                  value={this.state.inches}
                  onChange={event => this.setState({inches: event.target.value})}
                />
              </div>
              <label>Current Weight:</label>
              <input
                className="form-control profile-input profile-input-field"
                placeholder="weight in pounds"
                value={this.state.weight}
                onChange={event => this.setState({weight: event.target.value})}
              />
              <label>Activity Level: </label>
              <select
                className="profile-input"
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
                className="profile-input"
                value={this.state.goal}
                onChange={event => this.setState({goal: event.target.value})}
              >
                <option value={null}>-</option>
                <option value="maintain weight">maintain weight</option>
                <option value="lose 1 pound">lose 1 pound</option>
                <option value="lose 2 pounds">lose 2 pounds</option>
                <option value="gain 1 pound">gain 1 pound</option>
                <option value="gain 2 pounds">gain 2 pounds</option>
              </select>
              <div className="form-inline">
                <button
                  className="btn btn-primary profile-input"
                  onClick={() => this.updateProfile()}
                >
                  Save
                </button>

                {
                  this.props.state.profile.name !== null
                  ?
                    <button className="btn btn-warning profile-input"><Link to={'/Home'}>Cancel</Link></button>
                  :
                    <Link
                      to={'/'}
                      onClick={() => this.signOut()}
                    >
                      <button className="btn btn-warning">Sign Out</button>
                    </Link>
                }

              </div>
            </div>
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
