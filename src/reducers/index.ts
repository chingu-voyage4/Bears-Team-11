import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import appReducer from './appReducer';
import tagsReducer from './tagsReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  registerLoginWindow: appReducer,
  tags: tagsReducer,
  categories: categoriesReducer
});
