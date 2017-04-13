import { LOAD_PROFILE } from '../constants';

let profile = {
  name: null
}

export default (state = profile, action) => {
  switch(action.type) {
    case LOAD_PROFILE:
      profile = action.data;
      return profile;
    default:
      return state;
  }
}
