import { combineReducers } from 'redux';
import user from './reducer_user';
import newUser from './reducer_profile_submitted';
import profile from './reducer_profile_data';
import currentDayFoods from './reducer_current_foods';
import history from './reducer_history';

export default combineReducers( {
  user,
  newUser,
  profile,
  currentDayFoods,
  history
})
