import { LOGIN, REGISTER, LOGOUT } from './actionTypes';

export function login(
  email: string,
  password: string
): (dispatch: any) => void {
  return dispatch => {
    // make ajax call to api server to login user
    // if success dispatch login action
    // otherwise if error dispatch error action
    dispatch({
      type: LOGIN
    });
  };
}

export function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): (dispatch: any) => void {
  return dispatch => {
    // make ajax call to api server to register user
    // if success dispatch register action
    // otherwise if error dispatch error action
    dispatch({
      type: REGISTER
    });
  };
}

export function logout(): (dispatch: any) => void {
  return dispatch => {
    // make ajax call to api server to logout user user
    // if success dispatch logout action
    // otherwise if error dispatch error action
    dispatch({
      type: LOGOUT
    });
  };
}
