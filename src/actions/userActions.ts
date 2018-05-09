import {
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_ERROR,
  LOGIN,
  REGISTER,
  LOGOUT,
  LOGOUT_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  UPLOAD_PROFILE_IMAGE,
  USER_SETTINGS_UPDATE
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { UserAction, Action } from '../types/Redux';

/*
==========================
LOGIN
==========================
*/
async function loginWithDispatchAsync(
  dispatchType: any,
  dispatch: Dispatch<Action>,
  email: string,
  password: string
): Promise<void> {
  var user = await apiService.login(email, password);
  localStorage.setItem('user', JSON.stringify(user));
  dispatch({ type: dispatchType, data: user });
}

export type login_fntype = (email: string, password: string) => Promise<void>;

export function login(
  email: string,
  password: string
): (dispatch: Dispatch<UserAction>) => Promise<void> {
  return dispatch => {
    return loginWithDispatchAsync(LOGIN, dispatch, email, password);
  };
}
/*
==========================
GOOGLE LOGIN
==========================
*/
export type googleLogin_fntype = (
  idToken: string
) => (dispatch: Dispatch<UserAction>) => void;

export function googleLogin(
  idToken: string
): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService
      .googleLogin(idToken)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
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
/*
==========================
REGISTER
==========================
*/

async function registerWithDispatchAsync(
  dispatchType: any,
  dispatch: Dispatch<Action>,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): Promise<void> {
  var user = await apiService.register(
    firstName,
    lastName,
    username,
    email,
    password
  );
  localStorage.setItem('user', JSON.stringify(user));
  dispatch({ type: dispatchType, data: user });
}
export type register_fntype = (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => Promise<void>;

export function register(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): (dispatch: Dispatch<UserAction>) => Promise<void> {
  return dispatch => {
    return registerWithDispatchAsync(
      REGISTER,
      dispatch,
      firstName,
      lastName,
      username,
      email,
      password
    );
  };
}
/*
==========================
UPLOAD PROFILE IMAGE
==========================
*/
export type uploadProfileImage_fntype = (
  file: FileList,
  userId: string
) => Promise<void>;

export function uploadProfileImage(
  file: FileList,
  userId: string
): (dispatch: Dispatch<UserAction>) => Promise<void> {
  return dispatch => {
    async function doAsyncWork(): Promise<void> {
      var user = await apiService.uploadProfileImage(file, userId);
      dispatch({ type: UPLOAD_PROFILE_IMAGE, data: user });
    }
    return doAsyncWork();
  };
}
/*
==========================
LOGOUT
==========================
*/
export type logout_fntype = () => (dispatch: Dispatch<UserAction>) => void;

export function logout(): (dispatch: Dispatch<UserAction>) => void {
  return dispatch => {
    return apiService
      .logout()
      .then(res => {
        localStorage.removeItem('user');
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

/*
==========================
GET ALL USERS
==========================
*/

export type getAllUsers_fntype = () => (dispatch: Dispatch<Action>) => void;

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

/*
==========================
USER SETTINGS (PUBLIC BIO) UPDATE
==========================
*/

export type userSettingsUpdate_fntype = (
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
) => (dispatch: Dispatch<Action>) => void;

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
        localStorage.setItem('user', JSON.stringify(user));
        return dispatch({
          type: USER_SETTINGS_UPDATE,
          data: user
        });
      });
  };
}
/*
==========================
USER SETTINGS (PRIVATE BIO) UPDATE
==========================
*/

export type userPrivateSettingsUpdate_fntype = (
  firstName: string,
  lastName: string,
  email: string,
  userId: string
) => (dispatch: Dispatch<Action>) => void;

export function userPrivateSettingsUpdate(
  firstName: string,
  lastName: string,
  email: string,
  userId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService
      .userPrivateSettingsUpdate(firstName, lastName, email, userId)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return dispatch({
          type: USER_SETTINGS_UPDATE,
          data: user
        });
      });
  };
}
