import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import markerReducer from './markerReducer';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  markers: markerReducer
});
