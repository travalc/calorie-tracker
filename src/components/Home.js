import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageCalories: '',
      targetCalories: ''
    }
  }

  signOut() {
    firebaseApp.auth().signOut();
    window.location.reload(true);
  }

  render() {
    console.log(this.props.state);
    return (
      <div className="Home">
        <div className="home-head">
          <h2>Welcome Back, {this.props.state.profile.name}!</h2>
          <h4>What would you like to do? (Please select an option)</h4>
        </div>
        <div className="box-container">
          <Link className="box-link" to={'/CurrentDay'}>
            <div className="box-button">
              <span>Add Foods For Today</span>
              <span className="fa fa-plus button-icon"></span>
            </div>
          </Link>
          <Link className="box-link" to={'/History'}>
            <div className="box-button">
              <span>View Your Progress/Stats</span>
              <span className="fa fa-line-chart button-icon"></span>
            </div>
          </Link>
          <Link className="box-link" to={'/Profile'}>
            <div className="box-button">
              <span>Edit Your Profile</span>
              <span className="fa fa-pencil button-icon"></span>
            </div>
          </Link>
          <div onClick={() => this.signOut()} className="box-button">
            <span>Sign Out</span>
            <span className="fa fa-power-off button-icon"></span>
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

export default connect(mapStateToProps, null)(Home);
