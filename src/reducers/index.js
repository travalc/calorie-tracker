import { combineReducers } from 'redux';
import user from './reducer_user';
import newUser from './reducer_profile_submitted';
import profile from './reducer_profile_data';
import foods from './reducer_add_food';

export default combineReducers( {
  user,
  newUser,
  profile,
  foods
})
