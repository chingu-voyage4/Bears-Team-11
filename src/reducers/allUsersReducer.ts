import { GET_ALL_USERS } from '../actions/actionTypes';
import { Users, UsersState, UsersAction } from '../types/Redux';

function allUsersReducer(
  state: UsersState = {},
  action: UsersAction
): UsersState {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.data as Users;
    default:
      return state;
  }
}

export default allUsersReducer;
