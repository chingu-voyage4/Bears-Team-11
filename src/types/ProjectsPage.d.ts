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
