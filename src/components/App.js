import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      menuOpen: false
    }
  }

  componentDidMount() {
    this.setState({
      width: window.innerWidth
    });
  }

  signOut() {
    firebaseApp.auth().signOut();
    Location.reload();
  }

  toggleMenu() {
    this.state.menuOpen === false
      ?
        this.setState({menuOpen: true})
      :
        this.setState({menuOpen: false})
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {
          this.props.state.profile.name !== null
            ?
              this.state.width <= 450
                ?
                  this.state.menuOpen === false
                    ?
                      <nav className="w3-bar w3-black navigation closed-menu">
                        <Link to={'/Home'} className="w3-bar-item w3-button w3-mobile  w3-hover-black w3-hover-text-yellow nav-item"><span className="fa fa-cutlery app-icon"></span>   Home</Link>
                        <Link to={'/CurrentDay'} className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item">Log A Day</Link>
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
                      <nav className="w3-bar w3-black navigation open-menu">
                        <Link to={'/Home'} className="w3-bar-item w3-button w3-mobile  w3-hover-black w3-hover-text-yellow nav-item"><span className="fa fa-cutlery app-icon"></span>   Home</Link>
                        <Link to={'/CurrentDay'} className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item">Log A Day</Link>
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
                    <nav className="w3-bar w3-black navigation">
                      <Link to={'/Home'} className="w3-bar-item w3-button w3-mobile  w3-hover-black w3-hover-text-yellow nav-item"><span className="fa fa-cutlery app-icon"></span>   Home</Link>
                      <Link to={'/CurrentDay'} className="w3-bar-item w3-button w3-mobile w3-hover-black w3-hover-text-yellow nav-item">Log A Day</Link>
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

        {
          this.state.width <= 450
            ?
              <div className="toggle-bar">
                {
                  this.state.menuOpen === false
                    ?
                      <span
                        className="fa fa-bars toggle-icon"
                        onClick={() => this.toggleMenu()}
                      >
                      </span>
                    :
                      <span
                        className="fa fa-times toggle-icon"
                        onClick={() => this.toggleMenu()}
                      >
                      </span>
                  }
              </div>
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
