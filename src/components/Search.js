import React, { Component } from 'react';
import ReactModal from 'react-modal';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:'',
      showModal: false,
      currentSet: null,
      selectedItem: null
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
    console.log(this.state.selectedItem);
    return (
      <div>
        <p>Search for a food to add!</p>
        <div className="form-group form-inline">
          <input
            className="form-control"
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
                     </li>
                   )
                 })
               :
                  <li key={this.state.selectedItem.id}>
                    <span style={{display: 'block'}}><strong>Name:</strong> {this.state.selectedItem.name}</span>
                    <span style={{display: 'block'}}><strong>Calories:</strong> {this.state.selectedItem.calories}</span>
                  </li>
              :
                <div></div>
          }
          </ul>
          <button
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

export default Today;
