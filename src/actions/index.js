import { UPDATE_USER, PROFILE_SUBMITTED, LOAD_PROFILE, ADD_FOOD_ITEM, DELETE_FOOD_ITEM, EDIT_FOOD_ITEM, DELETE_CURRENT_DAY, LOAD_HISTORY, SET_CURRENT_DATE, CLEAR_CURRENT_DATE } from '../constants';

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

export function editItem(item) {
  const action = {
    type: EDIT_FOOD_ITEM,
    foodItem: item
  }
  return action;
}

export function deleteCurrentDay() {
  const action = {
    type: DELETE_CURRENT_DAY,
  }
  return action;
}

export function loadHistory(array) {
  const action = {
    type: LOAD_HISTORY,
    entries: array
  }
  return action;
}

export function setCurrentDate(date) {
  const action = {
    type: SET_CURRENT_DATE,
    currentDate: date
  }
  return action;
}

export function clearCurrentDate() {
  const action = {
    type: CLEAR_CURRENT_DATE,
  }
  return action;
}
