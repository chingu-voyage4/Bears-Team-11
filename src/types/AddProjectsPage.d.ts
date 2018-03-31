import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';

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

export interface AddProjectProps {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
}

export interface AddProjectPassedProps {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
}
