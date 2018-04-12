import { Dispatch } from 'react-redux';
import { AppAction } from './Redux';

export interface LoginState {
  email: string;
  password: string;
}
