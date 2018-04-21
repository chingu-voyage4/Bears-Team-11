import { User } from './User.d';
import { Dispatch } from 'react-redux';
import { Action } from '../types/Redux';

export interface PublicProfileState {
  aboutme: string;
  roles: string[];
  location: string;
  skills: string[];
  linkedin: string;
  github: string;
  portfolio: string;
  website: string;
  twitter: string;
  blog: string;
}

export interface PublicProfileProps {
  user: User;
  userSettingsUpdate: (
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
}
