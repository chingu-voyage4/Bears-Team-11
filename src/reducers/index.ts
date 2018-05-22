import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import markerReducer from './markerReducer';
import appReducer from './appReducer';
import tagsReducer from './tagsReducer';
import categoriesReducer from './categoriesReducer';
import allUsersReducer from './allUsersReducer';
import uploadImagesReducer from './uploadImages';
import addOrUpdateProjectReducer from './addOrUpdateProjectReducer';
import searchResultsReducer from './searchResultsReducer';
import currentProjectReducer from './currentProjectReducer';
import userProjectReducer from './userProjectReducer';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  userProjects: userProjectReducer,
  markers: markerReducer,
  registerLoginWindow: appReducer,
  tags: tagsReducer,
  categories: categoriesReducer,
  allUsers: allUsersReducer,
  imageLinks: uploadImagesReducer,
  addOrUpdateProject: addOrUpdateProjectReducer,
  searchResults: searchResultsReducer,
  currentProject: currentProjectReducer
});
