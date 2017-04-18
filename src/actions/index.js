import { UPDATE_USER, PROFILE_SUBMITTED, LOAD_PROFILE, ADD_FOOD_ITEM, DELETE_FOOD_ITEM } from '../constants';

export function updateUser(email) {
  const action = {
    type: UPDATE_USER,
    email
  }
  return action;
}

export function submitProfile(bool) {
  const action = {
    type: PROFILE_SUBMITTED,
    bool
  }
  return action;
}

export function loadProfile(data) {
  const action = {
    type: LOAD_PROFILE,
    data
  }
  return action;
}

export function addFoodItem(item) {
  const action = {
    type: ADD_FOOD_ITEM,
    foodItem: item
  }
  return action;
}

export function deleteFoodItem(item) {
  const action = {
    type: DELETE_FOOD_ITEM,
    item
  }
  return action;
}
