import { User } from './User.d';
import { Project } from '../types/Projects';
import { Action } from '../types/Redux';
import { Dispatch } from 'react-redux';
export interface LandingPageProps {
  user: User;
}

export interface LandingPageState {}

export interface RecentProjectsProps {
  projects: Array<Project> | Project;
  getProjects: (
    options: object,
    query: object | null
  ) => (dispatch: Dispatch<Action>) => void;
}
