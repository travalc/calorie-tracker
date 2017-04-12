import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';
import { Link } from 'react-router';
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
    this.props.updateUser(email);
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Register</h2>
        <p>To use this app, please sign up using a correctly formatted email, and a password.</p>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-control"
            placeholder="email"
            onChange={event => this.setState({email: event.target.value})}
          />
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            placeholder="password"
            onChange={event => this.setState({password: event.target.value})}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.register()}
          >
            Register
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to ={'/'}>Already a user? Sign in instead</Link></div>
      </div>
    )
  }
}

export default connect(null, { updateUser })(Register);
