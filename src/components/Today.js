import React, { Component } from 'react';
import ReactModal from 'react-modal';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:'',
      showModal: false,
      currentItem: null
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false})
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
      this.setState({currentItem: json.hits[0].fields.item_name});
    })
  }

  render() {
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
          <p>{this.state.currentItem}</p>
          <button
            onClick={() => this.handleCloseModal()}
          >
            Close
          </button>
        </ReactModal>
      </div>
    )
  }
}

export default Today;
