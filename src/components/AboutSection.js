import React, { Component } from 'react';
import { connect } from 'react-redux'

class AboutSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageCalories: '',
      targetCalories: ''
    }
  }

  componentWillMount() {
    this.setState({
      averageCalories: this.getAverageCaloriesPerDay(),
      targetCalories: this.getTargetCalories()
    })
  }

  getAverageCaloriesPerDay() {
    let total = 0;
    let average = null;
    if (this.props.state.history.length < 7 && this.props.state.history.length > 0) { //gets average if there is a history, but less than 7 days
      this.props.state.history.forEach(entry => {
        total += entry.totalCalories;
      });
      average = Math.round(total / this.props.state.history.length);
    }
    else if (this.props.state.history.length >= 7){ // gets average for last 7 days
      const firstSevenEntries = this.props.state.history.slice(0, 8);
      firstSevenEntries.forEach(entry => {
        total += entry.totalCalories;
      });
      average = Math.round(total / firstSevenEntries.length);
    }
    return average;
  }

  getTargetCalories() {
    let targetCalories = null;
    let BMR = null;
    let maintenanceCalories = null;

    //calculate BMR based on sex
    if (this.props.state.profile.sex === 'male') {
      BMR = 66 + (6.23 * this.props.state.profile.weight) + (12.7 * this.props.state.profile.inches)
        - (6.8 * this.props.state.profile.age);
    }
    else if (this.props.state.profile.sex === 'female') {
      BMR = 655 + (4.35 * this.props.state.profile.weight) + (4.7 * this.props.state.profile.inches)
        - (4.7 * this.props.state.profile.age);
    }

    //calculate maintenance calories based on activity level
    switch (this.props.state.profile.activityLevel) {
      case "sedentary":
        maintenanceCalories = BMR * 1.2;
        break;
      case "lightly active":
        maintenanceCalories = BMR * 1.375;
        break;
      case "moderately active":
        maintenanceCalories = BMR * 1.55;
        break;
      case "very active":
        maintenanceCalories = BMR * 1.725;
        break;
      case "extra active":
        maintenanceCalories = BMR * 1.9;
        break;
      default:
        maintenanceCalories = 0;
    }

    //calculate target calories based on goal
    switch (this.props.state.profile.goal) {
      case "lose 1 pound":
        targetCalories = Math.round(maintenanceCalories - 500);
        break;
      case "lose 2 pounds":
        targetCalories = Math.round(maintenanceCalories - 1000);
        break;
      case "gain 1 pound":
        targetCalories = Math.round(maintenanceCalories + 500);
        break;
      case "gain 2 pounds":
        targetCalories = Math.round(maintenanceCalories + 1000);
        break;
      default:
        targetCalories = 0;
    }

    return targetCalories;
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
          <li><strong>Target Caloric Intake:</strong> {this.state.targetCalories} calories per day</li>
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

export default connect(mapStateToProps, null)(AboutSection);
