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

export interface ProjectPageState {
  searchTerm: string;
  projectComponent: any | null;
}

export interface ProjectPageProps {
  user: User;
  projects: Array<Project> | Project;
  getProjects: (
    options: object,
    query: object | null
  ) => (dispatch: Dispatch<Action>) => void;
}
