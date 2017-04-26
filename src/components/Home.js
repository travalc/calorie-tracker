import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageCalories: '',
      targetCalories: ''
    }
  }


  render() {
    return (
      <div className="about" style={{padding: '20px'}}>
        <h2>Welcome Back!</h2>
        <h4>What would you like to do?</h4>
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
