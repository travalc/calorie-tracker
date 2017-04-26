import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';

class App extends Component {
  signOut() {
    firebaseApp.auth().signOut();
    Location.reload();
  }

  render() {
    console.log(this.props.state);
    return (
      <div>
        {
          this.props.state.profile.name !== null
            ?
              <nav className="w3-bar w3-black navigation">
                <Link to={'/Home'} className="w3-bar-item w3-button w3-mobile  w3-hover-black w3-hover-text-yellow nav-item">Home</Link>
                <Link to={'/CurrentDay'} className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item">Current Day</Link>
                <Link to={'/History'} className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item">History</Link>
                <Link to={'/profile'} className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item">Update Profile</Link>
                <Link to={'/'}
                    className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item"
                    onClick={() => this.signOut()}
                  >
                    Sign Out
                </Link>

              </nav>
            :
              <div></div>
        }

        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, null)(App);
