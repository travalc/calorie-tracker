import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentItem: null,
      averageCalories: '',
      targetCalories: ''
    }
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
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
    const entries = this.props.state.history;
    console.log(this.state.currentItem);
    return (
      <div>
        <div>Stats for {this.props.state.profile.name}</div>
        <div>Target Calories Per day to {this.props.state.profile.goal} per week: {this.getTargetCalories()}</div>
        <div>Average Calories Per day (based on the last week): {this.getAverageCaloriesPerDay()}</div>
        <ul style={{listStyleType: 'none'}}>
          {
            entries.length > 0
              ?
                entries.map(entry => {
                  return (
                    <li key={entry.key}>
                      <a
                        onClick={() => {
                          this.handleOpenModal();
                          this.setState({currentItem: entry});
                        }}
                      >
                        {entry.date}
                      </a>
                    </li>
                  )
                })
              :
                <div></div>
          }
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Detailed Day View"
          >
            {
              this.state.currentItem !== null
                ?
                  <div>
                    <h5>Summary for {this.state.currentItem.date}</h5>
                    <p><strong>Total Calories: </strong>{this.state.currentItem.totalCalories}</p>
                    <p><strong>Foods:</strong></p>
                    <ul style={{listStyleType: 'none'}}>
                      {
                        this.state.currentItem.foods.map(food => {
                          return (
                            <li key={food.id} style={{margin: '15px'}}>
                              <span style={{display: 'block'}}><strong>Name: </strong>{food.name}</span>
                              <span style={{display: 'block'}}><strong>Calories Per Serving: </strong>{food.calories}</span>
                              <span style={{display: 'block'}}><strong>Number of Servings: </strong>{food.quantity}</span>
                              <span style={{display: 'block'}}><strong>Total Calories: </strong>{food.totalCalories}</span>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                :
                  <div></div>
            }
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => this.handleCloseModal()}
            >
              Close
            </button>
          </ReactModal>
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

export default connect(mapStateToProps, null)(History);
