import { SHOW_REGISTER_WINDOW, SHOW_LOGIN_WINDOW } from './actionTypes';
import { Dispatch } from 'react-redux';
import { AppAction } from '../types/Redux';

export type showRegisterWindow_fntype = () => (
  dispatch: Dispatch<AppAction>
) => void;

export function showRegisterWindow(): (dispatch: Dispatch<AppAction>) => void {
  return dispatch => {
    return dispatch({
      type: SHOW_REGISTER_WINDOW
    });
  };
}

export type showLoginWindow_fntype = () => (
  dispatch: Dispatch<AppAction>
) => void;

export function showLoginWindow(): (dispatch: Dispatch<AppAction>) => void {
  return dispatch => {
    return dispatch({
      type: SHOW_LOGIN_WINDOW
    });
  };
}
