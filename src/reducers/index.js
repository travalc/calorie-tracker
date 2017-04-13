import { combineReducers } from 'redux';
import user from './reducer_user';
import newUser from './reducer_profile_submitted';
import profile from './reducer_profile_data';

export default combineReducers( {
  user,
  newUser,
  profile
})
