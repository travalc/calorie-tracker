import { ADD_FOOD_ITEM, DELETE_FOOD_ITEM } from '../constants';

export default (state = {foodItems: [], totalCalories: 0}, action) => {
  let currentDayFoods = null;
  const calories = state.totalCalories;
  switch (action.type) {
    case ADD_FOOD_ITEM:
      currentDayFoods = {
        foodItems: [...state.foodItems, action.foodItem],
        totalCalories: calories + action.foodItem.calories
      }
      return currentDayFoods;
    case DELETE_FOOD_ITEM:
      currentDayFoods = {
        foodItems: state.foodItems.filter(item => item.id !== action.item.id),
        totalCalories: calories - action.item.calories
      }
      return currentDayFoods;
    default:
      return state;
  }
}
