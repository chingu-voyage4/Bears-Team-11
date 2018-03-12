import { Dispatch } from 'react-redux';

// Action
export interface Action {
  type: string;
}

export interface UserAction extends Action {
  data: object;
  error?: string;
}

export interface ProjectAction extends Action {
  data: object;
}

// Reducers
export interface UserState {
  user?: object;
}

export interface ProjectState {
  project?: object;
}

// ReduxTextPage Component
export interface Store {
  user: object;
  projects: Array<object>;
}

export interface TestProps extends Store {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
  login: (
    email: string,
    password: string
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
