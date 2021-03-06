import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message:''
      }
    }
  }

  signIn() {
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    return (
      <div className="Welcome">
        <div className="welcome-content">
          <span className="fa fa-cutlery welcome-icon"></span>
          <h1>Calorie Tracking Application</h1>
          <h4>Sign In</h4>
          <div className="form-inline">
            <input
              className="form-control login-input login-field"
              placeholder="email"
              onChange={event => this.setState({email: event.target.value})}
            />
            <input
              className="form-control login-input login-field"
              type="password"
              placeholder="password"
              onChange={event => this.setState({password: event.target.value})}
            />
            <button
              className="btn btn-primary login-input login-button"
              type="button"
              onClick={() => this.signIn()}
            >
              Log In
            </button>
          </div>
          <div>{this.state.error.message}</div>
          <div><Link to={'/register'}>If you are not already a user, please click here to register</Link></div>
          <br />
          <a
            href="https://www.nutritionix.com/business/api"
            target="#"
          >
            Powered by Nutritionix API
          </a>
        </div>
      </div>
    )
  }
}

export default Welcome;
