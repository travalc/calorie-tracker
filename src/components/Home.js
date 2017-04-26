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
        <h3>About You</h3>
        <ul style={{listStyleType: 'none'}}>
          <li><strong>Name:</strong> {this.props.state.profile.name}</li>
          <li><strong>Age:</strong> {this.props.state.profile.age}</li>
          <li><strong>Sex:</strong> {this.props.state.profile.sex}</li>
          <li><strong>Height:</strong> {this.props.state.profile.feet}ft. {this.props.state.profile.inches}in.</li>
          <li><strong>Weight:</strong> {this.props.state.profile.weight}lbs</li>
          <li><strong>Target caloric intake to {this.props.state.profile.goal}:</strong> {this.state.targetCalories} calories per day</li>
          <li>
            {
              this.props.state.history.length < 7
                ?
                  <span><strong>Average Daily Calories:</strong> {this.state.averageCalories} calories per day</span>
                :
                  <span><strong>Average Daily Calories (based on last 7 days):</strong> {this.state.averageCalories} calories per day</span>
            }
          </li>
        </ul>
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
