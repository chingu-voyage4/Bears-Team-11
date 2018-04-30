import { Dispatch } from 'react-redux';
import { Project } from './Projects.d';
import { User } from './User.d';
import { Marker } from './Marker.d';
import { Tags, Tag } from './Tags.d';
import { Categories, Category } from './Category.d';
import { RegisterLoginWindow } from './AppAction';
import { getTags_fntype } from '../actions/tagsActions';
import { getCategories_fntype } from '../actions/categoryActions';
import {
  getAllUsers_fntype,
  userSettingsUpdate_fntype,
  uploadProfileImage_fntype,
  logout_fntype,
  register_fntype,
  googleLogin_fntype,
  login_fntype
} from '../actions/userActions';
import {
  addProject_fntype,
  getOneProject_fntype,
  deleteProject_fntype,
  downloadProjectImageURLS_fntype,
  updateProject_fntype,
  getProject_fntype,
  searchProjects_fntype,
  getProjects_fntype
} from '../actions/projectActions';
import {
  getMarkers_fntype,
  addMarker_fntype,
  moveMarker_fntype,
  addComment_fntype
} from '../actions/markerActions';
import {
  showRegisterWindow_fntype,
  showLoginWindow_fntype
} from '../actions/appActions';
// Action
export interface Action {
  type: string;
}

export interface UploadImageAction extends Action {
  data: string[];
}
export interface UserAction extends Action {
  data?: User;
  error?: string;
}

export interface AppAction extends Action {
  visible?: boolean;
}
export interface ProjectAction extends Action {
  data: Project | Project[];
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
export interface MarkerAction extends Action {
  data: Array<Marker> | Marker;
}

export type Users = Array<User>;

// Reducers
export type UserState = User | {};

export type ProjectState = Array<Project>;

// ReduxTextPage Component
export type CurrentProjectState = Project;

export type UsersState = Users | {};

export type AppState = RegisterLoginWindow;

export type TagsState = Tags | {};

export type CategoriesState = Categories | {};

export interface Store {
  user: User;
  projects: Array<Project> | Project;
  categories: Array<Category>;
  tags: Array<Tag>;
  registerLoginWindow: RegisterLoginWindow;
  allUsers: Users;
  imageLinks: string[];
  addOrUpdateProject: Project;
  searchResults: string | null;
  currentProject: Project;
  markers: Array<Marker>;
}

export interface LoginProps {
  visibleLoginWindow: boolean;
  login: login_fntype;
  showLoginWindow: showLoginWindow_fntype;
}
export interface RegisterProps {
  register: register_fntype;
  visibleRegisterWindow: boolean;
  showRegisterWindow: showRegisterWindow_fntype;
}

export interface ProjectProps {
  getProjects: getProjects_fntype;
}

export interface AddProjectProps {
  user: User;
  projects: Project;
  categories: Categories | any;
  tags: Tags | any;
  allUsers: Users;
  imageLinks: string[];
  addOrUpdateProject: Project;
  match: { params: { id: string } };
  addProject: addProject_fntype;
  getAllUsers: getAllUsers_fntype;
  getCategories: getCategories_fntype;
  getTags: getTags_fntype;
  updateProject: updateProject_fntype;
  getOneProject: getOneProject_fntype;
  getProjects: getProjects_fntype;
}

export interface ProjectPageFilterProps {
  projects: Array<Project> | Project;
  categories: Categories | any;
  tags: Tags | any;
  searchResults: string | null;
  getCategories: getCategories_fntype;
  getTags: getTags_fntype;
  searchProjects: searchProjects_fntype;
  getProjects: getProjects_fntype;
}

export interface GoogleProps {
  googleLogin: googleLogin_fntype;
}

export interface HeaderProps {
  visibleLoginWindow: boolean;
  visibleRegisterWindow: boolean;
  showRegisterWindow: showRegisterWindow_fntype;
  showLoginWindow: showLoginWindow_fntype;
}

export interface RecentProjectsProps {
  projects: Array<Project>;
  getProjects: getProjects_fntype;
}

export interface LandingPageProps {
  user: User;
}

export interface LoggedInHeaderProps {
  user: User;
  projects: Array<Project>;
  logout: any;
}

export interface State {}

export interface ProjectForEditProps {
  projects: Project;
  projId: string;
  data: any;
  deleteProject: deleteProject_fntype;
}

export interface ProjectsInheritedProps {
  projects: Array<Project>;
  arrayOfProjects: string;
  user: User;
  searchResults: string | null;
}

export interface ProjectSettingsProps {
  user: User;
  projects: Array<Project>;
  deleteProject: deleteProject_fntype;
  getProjects: getProjects_fntype;
  updateProject: updateProject_fntype;
}

export interface ProjectForPublicProfileProps {
  projects: Project;
  user: User;
  projId: string;
  data: Project;
  getProjects: getProjects_fntype;
}

export interface ProjectPageProps {
  user: User;
  projects: Array<Project>;
  searchResults: string | null;
  searchProjects: searchProjects_fntype;
  getProjects: getProjects_fntype;
}

export interface PublicProfileProps {
  user: User;
  userSettingsUpdate: userSettingsUpdate_fntype;
}

export interface SettingsPageProps {
  user: User;
  uploadProfileImage: uploadProfileImage_fntype;
}

export interface UserProfileProps {
  user: User;
  projects: Array<Project> | Project;
  getProjects: getProjects_fntype;
}

export interface ReadyToTryProps {
  visibleRegisterWindow: boolean;
  showRegisterWindow: showRegisterWindow_fntype;
}
