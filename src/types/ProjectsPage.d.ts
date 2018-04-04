import { Dispatch } from 'react-redux';
import { Project, TestProjectObject } from './Projects.d';

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
  projects: Array<Project>;
  getProjects: () => (dispatch: Dispatch<Action>) => void;
}
