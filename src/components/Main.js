import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseApp, firebaseDatabase } from '../firebase';
import { browserHistory, Link } from 'react-router';
import AboutSection from './AboutSection';
import Search from './Search';

class Main extends Component {
  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    console.log(this.props.state);
    return (
      <div>
        <AboutSection profile={this.props.state.profile} />
        <Search />
        <button
          className="btn btn-danger"
          onClick={() => this.signOut()}
        >
          Sign Out
        </button>
        <div><Link to={'/profile'}>Update Profile</Link></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, null)(Main);
