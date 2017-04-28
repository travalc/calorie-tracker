import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { addFoodItem } from '../actions';

class ManualAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      calories: '',
      quantity: ''
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  addItem(name, calories, quantity) {
    const item = {
      name: name,
      calories: calories,
      totalCalories: calories * quantity,
      quantity: quantity,
      id: Math.random()
    }
    this.props.addFoodItem(item);
    this.handleCloseModal();
    this.setState({ name: '', calories: '', quantity: ''});
  }

  render() {
    return (
      <div className="ManualAdd">
        <a
          onClick={() => this.handleOpenModal()}
        >
          Or click here if you want to enter an item manually
        </a>
        <ReactModal isOpen={this.state.showModal} contentLabel="Add Food Manually">
          <span
            className="close-modal glyphicon glyphicon-remove"
            onClick={() => {
              this.handleCloseModal();
              this.setState({selectedItem: null});
            }}
          >
          </span>
          <h4>Please enter food name, calories per serving, and number of servings</h4>
          <div>
            <span><strong>Name: </strong></span>
            <input
              className="form-control"
              onChange={event => this.setState({name: event.target.value})}
            />
          </div>
          <div>
            <span><strong>Calories Per Serving: </strong></span>
            <input
              className="form-control"
              onChange={event => this.setState({calories: event.target.value})}
            />
          </div>
          <div>
            <span><strong>Servings: </strong></span>
            <select name="quantity"
              onChange={event => this.setState({quantity: event.target.value})}
              defaultValue="0"
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
          <button
            className="btn btn-success add-screen-button"
            type="button"
            onClick={() => this.addItem(this.state.name, this.state.calories, this.state.quantity)}
          >
            Add Item
          </button>
          <button
            className="btn btn-danger add-screen-button"
            type="button"
            onClick={() => this.handleCloseModal()}
          >
            Cancel
          </button>
        </ReactModal>
      </div>
    )
  }
}

export default connect(null, { addFoodItem })(ManualAdd);
