import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';
import { User } from './User.d';
import { Tags } from './Tags.d';
import { Categories } from './Category.d';
import { RegisterLoginWindow } from './AppAction';
// Action
export interface Action {
  type: string;
}

export interface UserAction extends Action {
  data?: User;
  error?: string;
}

export interface AppAction extends Action {
  visible?: boolean;
}
export interface ProjectAction extends Action {
  data: Project;
}

export interface TagAction extends Action {
  tags: Tags;
}
export interface CategoryAction extends Action {
  categories: Categories;
}

// Reducers
export type UserState = User | {};

export type ProjectState = Array<Project>;

export type AppState = RegisterLoginWindow;

export type TagsState = Tags | {};

export type CategoriesState = Categories | {};

export interface Store {
  user: User;
  projects: Array<Project>;
  tags: Array<object>;
  categories: Array<object>;
  registerLoginWindow: RegisterLoginWindow;
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
    password: string,
    username: string
  ) => (dispatch: Dispatch<UserAction>) => void;
  logout: () => (dispatch: Dispatch<UserAction>) => void;
}

export interface LoginProps {
  visibleLoginWindow: boolean;
  login: (
    email: string,
    password: string
  ) => (dispatch: Dispatch<UserAction>) => void;
  showLoginWindow: () => (dispatch: Dispatch<AppAction>) => void;
  // googleLogin: (idToken: string) => (dispatch: Dispatch<UserAction>) => void;
}
export interface RegisterProps {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string
  ) => (dispatch: Dispatch<UserAction>) => void;
  visibleRegisterWindow: boolean;
  showRegisterWindow: () => (dispatch: Dispatch<AppAction>) => void;
  // googleLogin: (idToken: string) => (dispatch: Dispatch<UserAction>) => void;
}

export interface ProjectProps {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
}

// Register Component
export interface State {}
