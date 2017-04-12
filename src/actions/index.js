import { UPDATE_USER } from '../constants';

export function updateUser(email) {
  const action = {
    type: UPDATE_USER,
    email
  }
  return action;
}
