import { ADD_FOOD_ITEM, DELETE_FOOD_ITEM, EDIT_FOOD_ITEM } from '../constants';

const editFood = (foods =[], item) => {
  return foods.map(food => {
    if (food.id !== item.id) {
      return food;
    }
    else if (food.id === item.id) {
      return item;
    }
  });
}

const getOldCalories = (foods =[], id) => {
  let calories = null;
  foods.map(food => {
    if (food.id === id) {
      calories = food.totalCalories;
    }
  });
  return calories;
}



export default (state = {foodItems: [], totalCalories: 0}, action) => {
  let currentDayFoods = null;

  const calories = state.totalCalories;
  switch (action.type) {
    case ADD_FOOD_ITEM:
      currentDayFoods = {
        foodItems: [...state.foodItems, action.foodItem],
        totalCalories: calories + action.foodItem.totalCalories
      }
      return currentDayFoods;
    case DELETE_FOOD_ITEM:
      currentDayFoods = {
        foodItems: state.foodItems.filter(item => item.id !== action.item.id),
        totalCalories: calories - action.item.totalCalories
      }
      return currentDayFoods;
    case EDIT_FOOD_ITEM:

      const oldItemCalories = getOldCalories(state.foodItems, action.foodItem.id);
      currentDayFoods = {
        foodItems: editFood(state.foodItems, action.foodItem),
        totalCalories: calories - oldItemCalories + action.foodItem.totalCalories
      }
      return currentDayFoods;
    default:
      return state;
  }
}
