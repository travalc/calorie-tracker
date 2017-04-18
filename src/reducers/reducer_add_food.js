import { ADD_FOOD_ITEM } from '../constants';

export default (state = [], action) => {
  let foods = null;
  switch (action.type) {
    case ADD_FOOD_ITEM:
      foods = [...state, action.foodItem];
      return foods;
    default:
      return state;
  }
}
