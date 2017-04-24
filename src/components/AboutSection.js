import React, { Component } from 'react';

class AboutSection extends Component {
  getAverageCaloriesPerDay() {
    let total = 0;
    let average = null;
    if (this.props.entries.length < 7 && this.props.entries.length > 0) {
      this.props.entries.forEach(entry => {
        total += entry.totalCalories;
      });
      average = Math.round(total / this.props.entries.length);
    }
    else if (this.props.entries.length >= 7){
      const firstSevenEntries = this.props.entries.slice(0, 8);
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
          <li><strong>Name:</strong> {this.props.profile.name}</li>
          <li><strong>Age:</strong> {this.props.profile.age}</li>
          <li><strong>Sex:</strong> {this.props.profile.sex}</li>
          <li><strong>Height:</strong> {this.props.profile.feet}ft. {this.props.profile.inches}in.</li>
          <li><strong>Weight:</strong> {this.props.profile.weight}lbs</li>
          <li><strong>Target Caloric Intake:</strong> {this.props.profile.target} calories per day</li>
          <li>
            {
              this.props.entries.length < 7
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

export default AboutSection;
