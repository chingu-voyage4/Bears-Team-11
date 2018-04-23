import { User } from './User.d';
import { Dispatch } from 'react-redux';
import { Action } from '../types/Redux';

export interface PublicProfileState {
  aboutme: any;
  roles: any;
  location: any;
  skills: any;
  linkedin: any;
  github: any;
  portfolio: any;
  website: any;
  twitter: any;
  blog: any;
  _id: any;
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
