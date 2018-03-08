import {
  LOGIN,
  REGISTER,
  LOGOUT,
  LOGIN_ERROR,
  REGISTER_ERROR,
  LOGOUT_ERROR
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { UserAction } from '../types/Redux';

export function login(
  email: string,
  password: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    // make ajax call to api server to login user
    // if success dispatch login action
    // otherwise if error dispatch error action
    var user = apiService.login(email, password);
    if (user) {
      dispatch({
        type: LOGIN,
        data: user
      });
    } else {
      dispatch({
        type: LOGIN_ERROR,
        error: 'Invalid email and/or password.'
      });
    }
  };
}

export function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    // make ajax call to api server to register user
    // if success dispatch register action
    // otherwise if error dispatch error action
    if (apiService.register(firstName, lastName, email, password)) {
      dispatch({
        type: REGISTER,
        data: {
          firstName,
          lastName,
          email
        }
      });
    } else {
      dispatch({
        type: REGISTER_ERROR,
        error: 'Email is already in use.'
      });
    }
  };
}

export function logout(): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    // make ajax call to api server to logout user user
    // if success dispatch logout action
    // otherwise if error dispatch error action
    if (apiService.logout()) {
      dispatch({
        type: LOGOUT
      });
    } else {
      dispatch({
        type: LOGOUT_ERROR,
        error: 'There was an error logging out.'
      });
    }
  };
}
