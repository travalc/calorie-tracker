import { SET_CURRENT_DATE, CLEAR_CURRENT_DATE } from '../constants';

export default (state = '', action) => {
  let currentDate = null;
  switch (action.type) {
    case SET_CURRENT_DATE:
      currentDate = action.currentDate;
      return currentDate;
    case CLEAR_CURRENT_DATE:
      currentDate = '';
      return currentDate;
    default:
      return state;
  }
}
