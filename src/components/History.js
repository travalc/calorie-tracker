import React, { Component } from 'react';
import { connect } from 'react-redux'


class History extends Component {
  render() {
    const entries = this.props.state.history;
    return (
      <div>
        <ul>
          {
            entries.length > 0
              ?
                entries.map(entry => {
                  return (
                    <li key={entry.key}>
                      <span style={{display: 'block'}}>
                        <strong>Date: </strong>{entry.date}
                      </span>
                      <span style={{display: 'block'}}>
                        <strong>Total Calories: </strong>{entry.totalCalories}
                      </span>
                    </li>
                  )
                })
              :
                <div></div>
          }
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
