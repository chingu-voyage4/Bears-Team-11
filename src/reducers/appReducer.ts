import {
  SHOW_REGISTER_WINDOW,
  SHOW_LOGIN_WINDOW,
  COMPLETE_REGISTRATION
} from '../actions/actionTypes';
import { RegisterLoginWindow } from '../types/AppAction';
import { AppState, AppAction } from '../types/Redux';

var defaultState = {
  visibleLoginWindow: false,
  visibleRegisterWindow: false,
  justRegistered: false
};

function appReducer(
  state: AppState = defaultState,
  action: AppAction
): AppState {
  switch (action.type) {
    case SHOW_REGISTER_WINDOW:
      return Object.assign({}, state, {
        visibleRegisterWindow: !state.visibleRegisterWindow,
        visibleLoginWindow: false
      });

    case SHOW_LOGIN_WINDOW:
      return Object.assign({}, state, {
        visibleLoginWindow: !state.visibleLoginWindow,
        visibleRegisterWindow: false
      });
    case COMPLETE_REGISTRATION:
      return Object.assign({}, state, {
        justRegistered: !state.justRegistered
      });
    default:
      return state as RegisterLoginWindow;
  }
}

export default appReducer;
