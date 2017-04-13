import React, { Component } from 'react';

class AboutSection extends Component {
  render() {
    console.log(this.props.profile.height);
    return (
      <div className="about" style={{background: 'orange'}}>
        <h3>Your Stats</h3>
        <ul>
          <li><strong>Name:</strong> {this.props.profile.name}</li>
          <li><strong>Age:</strong> {this.props.profile.age}</li>
          <li><strong>Sex:</strong> {this.props.profile.sex}</li>
          <li><strong>Height:</strong> {this.props.profile.feet}ft. {this.props.profile.inches}in.</li>
          <li><strong>Weight:</strong> {this.props.profile.weight}lbs</li>
          <li><strong>Target Caloric Intake:</strong> {this.props.profile.target} calories per day</li>
        </ul>
      </div>
    )
  }
}

export default AboutSection;
