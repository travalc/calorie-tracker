import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentItem: null
    }
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    const entries = this.props.state.history;
    return (
      <div>
        <ul style={{display: 'block'}}>
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
