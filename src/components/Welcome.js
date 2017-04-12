import React, { Component } from 'react';
import { Link } from 'react-router';

class Welcome extends Component {
  render() {
    return (
      <div>
        <div><Link to={'/register'}>Please register</Link></div>
      </div>
    )
  }
}

export default Welcome;
