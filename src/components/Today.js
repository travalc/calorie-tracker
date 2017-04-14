import React, { Component } from 'react';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:''
    }
  }

  searchAPI() {
    const BASE_URL = 'https://api.nutritionix.com/v1_1/search';
    let search_url = `${BASE_URL}/${this.state.query}?&fields=nf_calories&appId=5348c271&appKey=e7d92cb75ab49dda35403e5763299439`;
    fetch(search_url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
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
            onClick={() => this.searchAPI()}
          >
            Search
          </button>
        </div>
      </div>
    )
  }
}

export default Today;
