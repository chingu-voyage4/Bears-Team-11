import { Dispatch } from 'react-redux';
import { AppAction } from './Redux';

export interface PassedProps {
  visibleLoginWindow: boolean;
  visibleRegisterWindow: boolean;
  showRegisterWindow: () => (dispatch: Dispatch<AppAction>) => void;
  showLoginWindow: () => (dispatch: Dispatch<AppAction>) => void;
}
export interface HeaderState {
  loginWindow: boolean;
  registerWindow: boolean;
}
