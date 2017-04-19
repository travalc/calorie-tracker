import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ManualAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
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

  render() {
    return (
      <div>
        <p>Click here to add a food</p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => this.handleOpenModal()}
        >
          Add Food
        </button>
        <ReactModal isOpen={this.state.showModal} contentLabel="Add Food Manually">
          <p>test</p>
          <button
            className="btn btn-danger"
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

export default ManualAdd;
