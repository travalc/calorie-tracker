import React, { Component } from 'react';
import Search from './Search';

class CurrentDay extends Component {
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
