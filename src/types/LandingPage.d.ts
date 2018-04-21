import { User } from './User.d';
import { Project } from '../types/Projects';
import { Action } from '../types/Redux';
import { Dispatch } from 'react-redux';
export interface LandingPageProps {
  user: User;
}

export interface LandingPageState {}

export interface RecentProjectsProps {
  projects: Array<Project>;
  getProjects: (options: object) => (dispatch: Dispatch<Action>) => void;
}
