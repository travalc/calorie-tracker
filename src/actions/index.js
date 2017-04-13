import { UPDATE_USER, PROFILE_SUBMITTED, LOAD_PROFILE } from '../constants';

export function updateUser(email) {
  const action = {
    type: UPDATE_USER,
    email
  }
  return action;
}

export function submitProfile(bool) {
  const action = {
    type: PROFILE_SUBMITTED,
    bool
  }
  return action
}

export function loadProfile(data) {
  const action = {
    type: LOAD_PROFILE,
    data
  }
  return action
}
