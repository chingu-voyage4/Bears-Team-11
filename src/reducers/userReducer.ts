interface UserState {}

interface Action {
  type: string;
}

function userReducer(state: UserState = {}, action: Action): UserState {
  switch (action.type) {
    default:
      return state;
  }
}

export default userReducer;
