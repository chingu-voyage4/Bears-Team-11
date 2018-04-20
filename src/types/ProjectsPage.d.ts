import { User } from './User.d';
import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';

export interface State {}

// Action
export interface Action {
  type: string;
}

export interface ProjectAction extends Action {
  data: Project;
}

export interface ProjectState {}

export interface ProjectsProps {}

export interface PassedProps {
  user: User;
  projects: Array<Project>;
  getProjects: () => (dispatch: Dispatch<Action>) => void;
}
