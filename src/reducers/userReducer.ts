import { LOGIN, REGISTER, LOGOUT } from '../actions/actionTypes';
import { User } from '../types/User';
import { UserState, UserAction } from '../types/Redux';

function userReducer(state: UserState = {}, action: UserAction): UserState {
  switch (action.type) {
    case LOGIN:
      return action.data as User;
    case REGISTER:
      return action.data as User;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default userReducer;
