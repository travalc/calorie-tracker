import { UPDATE_USER } from '../constants';

let user = {
  email: null
}

export default (state = user, action) => {
  switch (action.type) {
    case UPDATE_USER:
      const { email } = action;
      user = {
        email
      }
      return user;
    default:
      return state;
  }
}
