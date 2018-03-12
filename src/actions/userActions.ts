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
    return apiService
      .login(email, password)
      .then(user => {
        return dispatch({
          type: LOGIN,
          data: user
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          error: 'Invalid email and/or password.'
        });
      });
  };
}

export function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService
      .register(firstName, lastName, email, password)
      .then(user => {
        return dispatch({
          type: REGISTER,
          data: user
        });
      })
      .catch(error => {
        return dispatch({
          type: REGISTER_ERROR,
          error
        });
      });
  };
}

export function logout(): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService
      .logout()
      .then(res => {
        return dispatch({
          type: LOGOUT
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGOUT_ERROR,
          error
        });
      });
  };
}
