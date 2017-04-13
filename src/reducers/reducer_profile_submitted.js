import { PROFILE_SUBMITTED } from '../constants';

let newUser = true

export default (state = newUser, action) => {
  switch(action.type) {
    case PROFILE_SUBMITTED:
      newUser = action.bool;
      return newUser
    default:
      return state;
  }
}
