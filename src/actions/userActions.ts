import {
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_ERROR,
  LOGIN,
  REGISTER,
  LOGOUT,
  LOGIN_ERROR,
  REGISTER_ERROR,
  LOGOUT_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  UPLOAD_PROFILE_IMAGE
  USER_SETTINGS_UPDATE
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { UserAction, Action } from '../types/Redux';

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

export function googleLogin(
  idToken: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService
      .googleLogin(idToken)
      .then(user => {
        return dispatch({
          type: GOOGLE_LOGIN,
          data: user
        });
      })
      .catch(error => {
        return dispatch({
          type: GOOGLE_LOGIN_ERROR,
          error: 'Could not login with google'
        });
      });
  };
}

export function register(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService
      .register(firstName, lastName, username, email, password)
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

export function uploadProfileImage(
  file: File,
  userId: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService.uploadProfileImage(file, userId).then(user => {
      return dispatch({
        type: UPLOAD_PROFILE_IMAGE,
        data: user
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

export function getAllUsers(): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService
      .getAllUsers()
      .then(users => {
        return dispatch({
          type: GET_ALL_USERS,
          data: users
        });
      })
      .catch(error => {
        return dispatch({
          type: GET_ALL_USERS_ERROR,
          error
        });
      });
  };
}

export function userSettingsUpdate(
  aboutme: string,
  location: string,
  roles: string[],
  skills: string[],
  linkedin: string,
  github: string,
  portfolio: string,
  website: string,
  twitter: string,
  blog: string,
  userId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService
      .userSettingsUpdate(
        aboutme,
        location,
        roles,
        skills,
        linkedin,
        github,
        portfolio,
        website,
        twitter,
        blog,
        userId
      )
      .then(user => {
        return dispatch({
          type: USER_SETTINGS_UPDATE,
          data: user
        });
      });
  };
}
