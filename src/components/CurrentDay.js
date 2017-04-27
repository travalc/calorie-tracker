import React, { Component } from 'react';
import { firebaseApp, firebaseDatabase } from '../firebase'
import ReactModal from 'react-modal';
import moment from 'moment';
import Search from './Search';
import ManualAdd from './ManualAdd';
import { connect } from 'react-redux';
import { deleteFoodItem, editItem, deleteCurrentDay, setCurrentDate, clearCurrentDate } from '../actions';

class CurrentDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editItem: {},
      quantity: '',
      name: '',
      calories: '',
      date: '',
      dateSinceEpoch:''
    }
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  componentWillMount() {
    this.setState({
      date: this.props.state.currentDate
    })
  }

  editFoodItem(name, calories, quantity, id) {
    const item = {
      name: name,
      calories: calories,
      totalCalories: calories * quantity,
      quantity: quantity,
      id: id
    }
    console.log(item);
    this.props.editItem(item);
  }

  addDay() {
    const userId = firebaseApp.auth().currentUser.uid;
    const foods = this.props.state.currentDayFoods.foodItems;
    const totalCalories = this.props.state.currentDayFoods.totalCalories;
    const date = this.state.date;

    const day = {
      date: date,
      foods: foods,
      totalCalories: totalCalories
    }

    if (foods.length > 0 && date.length > 0) {
      firebaseDatabase.ref('users/' + userId + '/entries').push(day);
      this.setState({date: ''});
      this.props.deleteCurrentDay();
      this.props.clearCurrentDate();
    }
    else {
      alert('Entry needs a date and food entries');
    }
  }

  isThisADuplicateDate(date) { //checks if day being logged already exists in user history
    const history = this.props.state.history;
    let count = 0;
    var duplicate;
    history.forEach(entry => {
      if (entry.date === date) {
        count ++;
      }
    });
    count > 0 ? duplicate = true : duplicate =  false;
    return duplicate;
  }

  sendDateToAppState(date) {
    this.props.setCurrentDate(date);
  }

  render() {
    console.log(this.props);
    return (
      <div className="CurrentDay">
        {
          this.state.date === ''
            ?
              <div className="date-screen">
                <h4>Please Select The Date</h4>
                <input
                  type="date"
                  onChange={event => {
                    const enteredDate = moment(event.target.value).format("MMMM Do YYYY")
                    if (this.isThisADuplicateDate(enteredDate) === false) {
                      this.setState({
                        date: enteredDate
                      });
                      this.sendDateToAppState(enteredDate);
                    }
                    else {
                      alert('An entry for this date already exists');
                    }
                  }}
                />
              </div>
            :
              <div className="log-screen">
                <h4>What You Have Eaten Today, {this.state.date}</h4>
                <Search />
                <ManualAdd />
                <ul style={{listStyleType: 'none'}}>
                  {
                    this.props.state.currentDayFoods.foodItems.length > 0
                      ?
                        this.props.state.currentDayFoods.foodItems.map(item => {
                          return (
                            <li key={item.id} style={{margin: '15px'}}>
                              <span style={{display: 'block'}}><strong>Name:</strong> {item.name}</span>
                              <span style={{display: 'block'}}><strong>Servings:</strong> {item.quantity}</span>
                              <span style={{display: 'block'}}><strong>Total Calories:</strong> {item.totalCalories}</span>

                              <span
                                className="glyphicon glyphicon-pencil"
                                onClick={() => {
                                  this.handleOpenModal();
                                  this.setState({
                                    editItem: item,
                                    name: item.name,
                                    calories: item.calories,
                                    totalCalories: item.totalCalories,
                                    quantity: item.quantity
                                  });
                                }}
                              >
                              </span>
                              <span
                                className="glyphicon glyphicon-remove"
                                onClick={() => this.props.deleteFoodItem(item)}
                                style={{marginLeft: '5px'}}
                              >
                              </span>
                            </li>
                          )
                        })
                      :
                        <li>Nothing Yet</li>
                  }
                </ul>
                <p><strong>Total Calories For Today:</strong> {this.props.state.currentDayFoods.totalCalories}</p>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => this.addDay()}
                >
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => this.props.deleteCurrentDay()}
                >
                  Delete All
                </button>
                <a
                  onClick={() => {
                    this.props.deleteCurrentDay();
                    this.props.clearCurrentDate();
                    this.setState({date: ''});
                  }}
                >
                  Cancel
                </a>

              {
                //Editing Modal
              }
                <ReactModal
                  isOpen={this.state.showModal}
                  contentLabel="Edit Food"
                >
                  <span style={{display: 'block'}}>
                    <strong>Name:</strong><input className="form-control" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
                  </span>
                  <span style={{display: 'block'}}>
                    <strong>Calories Per Serving:</strong> <input className="form-control" value={this.state.calories} onChange={event => this.setState({calories: event.target.value})}/>
                  </span>
                  <span style={{display: 'block'}}>
                    <strong>Total Calories:</strong> {this.state.calories * this.state.quantity}
                  </span>
                  <div className="form-inline">
                    <span><strong>Servings:</strong> </span>
                    <select name="servings"
                      value={this.state.quantity}
                      onChange={event => this.setState({quantity: event.target.value})}
                    >
                      <option value={0}>-</option>
                      <option value={1}>01</option>
                      <option value={2}>02</option>
                      <option value={3}>03</option>
                      <option value={4}>04</option>
                      <option value={5}>05</option>
                      <option value={6}>06</option>
                      <option value={7}>07</option>
                      <option value={8}>08</option>
                      <option value={9}>09</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                  <div style={{margin: "10px"}} className="form-inline">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => {
                        this.editFoodItem(this.state.name, this.state.calories, this.state.quantity, this.state.editItem.id);
                        this.handleCloseModal();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        this.props.deleteFoodItem(this.state.editItem);
                        this.handleCloseModal();
                      }}
                    >
                      Delete Item
                    </button>
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={() => this.handleCloseModal()}
                    >
                      Cancel
                    </button>
                  </div>
                </ReactModal>
              </div>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, { deleteFoodItem, editItem, deleteCurrentDay, setCurrentDate, clearCurrentDate })(CurrentDay);
