import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Search from './Search';
import { connect } from 'react-redux';
import { deleteFoodItem, editItem } from '../actions';

class CurrentDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editItem: {},
      quantity: '',
      name: '',
      calories: '',
    }
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
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

  render() {
    console.log(this.props);
    console.log(this.state.quantity);
    return (
      <div style={{padding: '20px'}}>
        <h4>What You Have Eaten Today</h4>
        <Search />
        <ul style={{listStyleType: 'none'}}>
          {
            this.props.foods.foodItems.length > 0
              ?
                this.props.foods.foodItems.map(item => {
                  return (
                    <li key={item.id} style={{margin: '15px'}}>
                      <span style={{display: 'block'}}><strong>Name:</strong> {item.name}</span>
                      <span style={{display: 'block'}}><strong>Servings:</strong> {item.quantity}</span>
                      <span style={{display: 'block'}}><strong>Total Calories:</strong> {item.totalCalories}</span>
                      <div
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
                        <span className="glyphicon glyphicon-pencil"></span>
                      </div>

                    </li>
                  )
                })
              :
                <li>Nothing Yet</li>
          }
        </ul>
        <p><strong>Total Calories For Today:</strong> {this.props.foods.totalCalories}</p>

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
    )
  }
}

export default connect(null, { deleteFoodItem, editItem })(CurrentDay);
