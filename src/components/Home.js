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
      <div className="Home">
        <div className="home-head">
          <h2>Welcome Back!</h2>
          <h4>What would you like to do?</h4>
        </div>
        <div className="box-container">
          <div className="box-button">
            <span>Add Foods For Today</span>
            <span className="fa fa-plus button-icon"></span>
          </div>
          <div className="box-button">
            <span>View Your Progress/Stats</span>
            <span className="fa fa-line-chart button-icon"></span>
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
