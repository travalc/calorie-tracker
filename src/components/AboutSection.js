import React, { Component } from 'react';
import { connect } from 'react-redux'

class AboutSection extends Component {
  getAverageCaloriesPerDay() {
    let total = 0;
    let average = null;
    if (this.props.state.history.length < 7 && this.props.state.history.length > 0) {
      this.props.state.history.forEach(entry => {
        total += entry.totalCalories;
      });
      average = Math.round(total / this.props.state.history.length);
    }
    else if (this.props.state.history.length >= 7){
      const firstSevenEntries = this.props.state.history.slice(0, 8);
      firstSevenEntries.forEach(entry => {
        total += entry.totalCalories;
      });
      average = Math.round(total / firstSevenEntries.length);
    }
    return average;
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
          <li><strong>Target Caloric Intake:</strong> {this.props.state.profile.target} calories per day</li>
          <li>
            {
              this.props.state.history.length < 7
                ?
                  <span><strong>Average Daily Calories:</strong> {this.getAverageCaloriesPerDay()} calories per day</span>
                :
                  <span><strong>Average Daily Calories (based on last 7 days):</strong> {this.getAverageCaloriesPerDay()} calories per day</span>
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

export default connect(mapStateToProps, null)(AboutSection);
