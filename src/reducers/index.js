import { combineReducers } from 'redux';
import user from './reducer_user';
import newUser from './reducer_profile'

export default combineReducers( {
  user,
  newUser
})
