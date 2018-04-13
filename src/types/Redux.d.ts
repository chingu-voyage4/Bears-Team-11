import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';
import { User } from './User.d';
import { Tags, Tag } from './Tags.d';
import { Categories, Category } from './Category.d';
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

export interface UsersAction extends Action {
  data: Users;
}

export interface TagAction extends Action {
  data: Tags;
}
export interface CategoryAction extends Action {
  data: Categories;
}

export type Users = Array<User>;

// Reducers
export type UserState = User | {};

export type ProjectState = Array<Project>;

export type UsersState = Users | {};

export type AppState = RegisterLoginWindow;

export type TagsState = Tags | {};

export type CategoriesState = Categories | {};

export interface Store {
  user: User;
  projects: Array<Project>;
  categories: Array<Category>;
  tags: Array<Tag>;
  registerLoginWindow: RegisterLoginWindow;
  allUsers: Users;
}

export interface LoginProps {
  visibleLoginWindow: boolean;
  login: (
    email: string,
    password: string
  ) => (dispatch: Dispatch<UserAction>) => void;
  showLoginWindow: () => (dispatch: Dispatch<AppAction>) => void;
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
}

export interface ProjectProps {
  getProjects: () => (dispatch: Dispatch<ProjectAction>) => void;
}

export interface AddProjectProps {
  user: User;
  projects: Array<Project>;
  categories: Categories | any;
  tags: Tags | any;
  allUsers: Users;
  addProject: (project: Project) => (dispatch: Dispatch<ProjectAction>) => void;
  getAllUsers: () => (dispatch: Dispatch<Action>) => void;
  getCategories: () => (dispatch: Dispatch<Action>) => void;
  getTags: () => (dispatch: Dispatch<Action>) => void;
}

// Register Component
export interface State {}
