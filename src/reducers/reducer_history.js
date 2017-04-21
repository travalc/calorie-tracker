import { LOAD_HISTORY } from '../constants';

export default (state = [], action) => {
  let history = null;
  switch (action.type) {
    case LOAD_HISTORY:
      history = action.entries;
      return history;
    default:
      return state;
  }
}
