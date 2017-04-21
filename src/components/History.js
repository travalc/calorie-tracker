import React, { Component } from 'react';


class History extends Component {
  render() {
    const entries = this.props.entries;
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

export default History;
