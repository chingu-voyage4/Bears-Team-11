import {
  SHOW_REGISTER_WINDOW,
  SHOW_LOGIN_WINDOW,
  COMPLETE_REGISTRATION
} from './actionTypes';
import { Dispatch } from 'react-redux';
import { AppAction } from '../types/Redux';
import { Action } from '../types/Redux';

/*
==========================
REGISTER WINDOW VISIBILITY
==========================
*/
export type showRegisterWindow_fntype = () => (
  dispatch: Dispatch<Action>
) => void;

export function showRegisterWindow(): (dispatch: Dispatch<AppAction>) => void {
  return dispatch => {
    return dispatch({
      type: SHOW_REGISTER_WINDOW
    });
  };
}
/*
==========================
LOGIN WINDOW VISIBILITY
==========================
*/
export type showLoginWindow_fntype = () => (dispatch: Dispatch<Action>) => void;

export function showLoginWindow(): (dispatch: Dispatch<AppAction>) => void {
  return dispatch => {
    return dispatch({
      type: SHOW_LOGIN_WINDOW
    });
  };
}

/*
==========================
COMPLETE REGISTRATION
==========================
*/

export function completeRegistration(): (
  dispatch: Dispatch<AppAction>
) => void {
  return dispatch => {
    return dispatch({
      type: COMPLETE_REGISTRATION
    });
  };
}
