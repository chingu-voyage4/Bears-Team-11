import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';
import { User } from './User.d';

// Action
export interface Action {
  type: string;
}

export interface UserAction extends Action {
  data?: User;
  error?: Error;
}

export interface ProjectAction extends Action {
  data: Project;
}

// Reducers
export type UserState = User | {};

export type ProjectState = Array<Project>;

// ReduxTextPage Component
export interface Store {
  user: object;
  projects: Array<object>;
  tags: Array<object>;
  categories: Array<object>;
}

export interface TestProps extends Store {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
  login: (
    email?: string,
    password?: string
  ) => (dispatch: Dispatch<UserAction>) => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => (dispatch: Dispatch<UserAction>) => void;
  logout: () => (dispatch: Dispatch<UserAction>) => void;
}

// Login Component
export interface LoginProps {
  login: (
    email: string,
    password: string
  ) => (dispatch: Dispatch<UserAction>) => void;
}

export interface RegisterProps {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => (dispatch: Dispatch<UserAction>) => void;
}

export interface ProjectProps {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
}

// Register Component
export interface State {}
