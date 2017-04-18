import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Search from './Search';

class CurrentDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      quantity: 0
    }
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    console.log(this.props);
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
                      <span style={{display: 'block'}}><strong>Calories:</strong> {item.calories}</span>
                      <div
                        onClick={() => this.handleOpenModal()}
                      >
                        <span className="glyphicon glyphicon-pencil"></span>
                      </div>
                      <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Edit Food"
                      >
                        <span style={{display: 'block'}}><strong>Name:</strong> {item.name}</span>
                        <span style={{display: 'block'}}><strong>Calories:</strong> {item.calories}</span>
                        <div className="form-inline">
                          <span><strong>Servings:</strong> </span>
                          <select name="servings"
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
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger"
                            type="button"
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
                    </li>
                  )
                })
              :
                <li>Nothing Yet</li>
          }
        </ul>
        <p><strong>Total Calories For Today:</strong> {this.props.foods.totalCalories}</p>
      </div>
    )
  }
}

export default CurrentDay;
