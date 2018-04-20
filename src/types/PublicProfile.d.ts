import { User } from './User.d';
import { Dispatch } from 'react-redux';
import { UserAction } from '../types/Redux';

export interface PublicProfileState {
  aboutme: string;
  headline: string;
  skills: string;
  linkedin: string;
  github: string;
  portfolio: string;
  website: string;
  twitter: string;
  blog: string;
}

export interface PublicProfileProps {
  user: User;
  userSettingsUpdate: (user: User) => (dispatch: Dispatch<UserAction>) => void;
}
