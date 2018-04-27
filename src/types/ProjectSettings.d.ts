import { User } from './User.d';
import { Projects } from './Projects.d';
import { Action } from './Redux.d';
import { Dispatch } from 'react-redux';

export interface ProjectSettingsProps {
  user: User;
  projects: Array<Projects>;
  deleteProject: (id: string) => (dispatch: Dispatch<Action>) => void;
  getProjects: (
    options: object,
    query: object | null
  ) => (dispatch: Dispatch<Action>) => void;
  updateProject: (id: string) => (dispatch: Dispatch<Action>) => void;
}

export interface ProjectSettingsState {}
