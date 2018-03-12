import {
  LOGIN,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_ERROR,
  LOGOUT,
  LOGOUT_ERROR
} from '../actions/actionTypes';
import { UserState, UserAction } from '../types/Redux';

function userReducer(state: UserState = {}, action: UserAction): UserState {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGIN_ERROR:
      return state;
    case REGISTER:
      return state;
    case REGISTER_ERROR:
      return state;
    case LOGOUT:
      return {};
    case LOGOUT_ERROR:
      return state;
    default:
      return state;
  }
}

export default userReducer;
