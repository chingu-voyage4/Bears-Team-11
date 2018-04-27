import { Dispatch } from 'react-redux';
import { UserAction } from './Redux';

export interface GoogleProps {
  googleLogin: (idToken: string) => (dispatch: Dispatch<UserAction>) => void;
}
