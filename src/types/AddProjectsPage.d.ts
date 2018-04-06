import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';
import { User } from './User.d';

// Action
export interface Action {
  type: string;
}

export interface ProjectAction extends Action {
  data: Project;
}

export interface AddProjectState {
  name?: string;
  description?: string;
  dueDate?: string;
  team?: string[];
  githubLink?: string;
  mockupLink?: string;
  liveLink?: string;
  lookingFor?: string[];
  status?: string;
  category?: string;
  tags?: string[];
  images?: any;
  contact?: string;
  createdAt?: string;
  creator?: string;
  categoryPlaceholder: string;
  tagPlaceholder: string | string[];
  preview?: any;
  files?: any;
}
export interface AddProjectPassedProps {
  user: User;
  projects: Array<Project>;
  addProject: (project: Project) => (dispatch: Dispatch<ProjectAction>) => void;
}
