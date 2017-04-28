import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { addFoodItem } from '../actions';


class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:'',
      showModal: false,
      currentSet: null,
      selectedItem: null,
      quantity: null
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

  selectItem(item) {
    this.setState({selectedItem: item});
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
    this.setState({ currentSet: null, selectedItem: null});
  }

  searchAPI() {
    const BASE_URL = 'https://api.nutritionix.com/v1_1/search';
    let search_url = `${BASE_URL}/${this.state.query}?&fields=item_name,nf_calories&appId=5348c271&appKey=e7d92cb75ab49dda35403e5763299439`;
    fetch(search_url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let itemSet = [];
      json.hits.forEach(item => {
        const itemInfo = {
          name: item.fields.item_name,
          calories: item.fields.nf_calories,
          id: Math.random()
        };
        itemSet.push(itemInfo);
      })
      this.setState({currentSet: itemSet});
    })
  }

  render() {
    return (
      <div className="Search">
        <p>Search for a food to add!</p>
        <div className="form-group form-inline search-form">
          <input
            className="form-control search-input"
            placeholder="ex. banana"
            onChange={event => this.setState({query: event.target.value})}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              this.searchAPI();
              this.handleOpenModal();
            }}
          >
            Search
          </button>

        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Food Selection"
        >
          <h3 className="results-title">Results for {this.state.query}</h3>
          <ul style={{listStyleType: 'none'}}>
          {
            this.state.currentSet !== null
              ?
                this.state.selectedItem === null
                ?
                  this.state.currentSet.map(item => {
                    return (
                      <li key={item.id} style={{margin: '15px'}}>
                        <span style={{display: 'block'}}><strong>Name:</strong> {item.name}</span>
                        <span style={{display: 'block'}}><strong>Calories Per Serving:</strong> {item.calories}</span>
                        <button
                          className="btn btn-success"
                          type="button"
                          onClick={() => this.selectItem(item)}
                        >
                          Select
                        </button>
                        <hr />
                     </li>
                   )
                 })
               :
                  <li key={this.state.selectedItem.id}>
                    <span style={{display: 'block'}}><strong>Name:</strong> {this.state.selectedItem.name}</span>
                    <span style={{display: 'block'}}><strong>Calories:</strong> {this.state.selectedItem.calories}</span>
                    <div>
                      <span><strong>Quantity:</strong></span>
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
                    <div className="form-inline">
                      <button
                        className="btn btn-success add-screen-button"
                        type="button"
                        onClick={() => {
                          this.addItem(this.state.selectedItem.name, this.state.selectedItem.calories, this.state.quantity);
                          this.setState({quantity: 0});
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-danger add-screen-button"
                        type="button"
                        onClick={() => this.setState({selectedItem: null})}
                      >
                        Back
                      </button>
                    </div>
                  </li>
              :
                <div></div>
          }
          </ul>
          <a
            href="https://www.nutritionix.com/business/api"
            target="#"
          >
            <img
              src="https://d2eawub7utcl6.cloudfront.net/images/poweredby_nutritionix_api.png"
              alt="Nutritionix logo"
            />
          </a>
          <button
            className="btn btn-warning close-results"
            onClick={() => {
              this.handleCloseModal();
              this.setState({selectedItem: null});
            }}
          >
            Close
          </button>
        </ReactModal>
      </div>
    )
  }
}

export default connect(null, { addFoodItem })(Today);
