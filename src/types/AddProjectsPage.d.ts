import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';
import { User } from './User.d';
import { UsersAction, Users } from './Redux.d';
import { Categories } from './Category.d';
import { Tags } from './Tags.d';
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
  teamPlaceholder: string | string[];
  preview?: any;
  files?: any;
}
