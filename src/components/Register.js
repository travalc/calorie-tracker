import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  register() {
    const { email, password } = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })        
  }

  render() {
    return (
      <div className="form-inline">
        <h2>Register</h2>
        <p>To use this app, please sign up using a correctly formatted email, and a password.</p>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="email"
            onChange={event => this.setState({email: this.target.value})}
          />
          <input
            className="form-control"
            type="password"
            placeholder="password"
            onChange={event => this.setState({password: this.target.value})}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.register()}
          >
            Register
          </button>
        </div>
      </div>
    )
  }
}

export default Register;
