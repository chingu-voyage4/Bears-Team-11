import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import annotationReducer from './annotationReducer';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  markers: annotationReducer
});
