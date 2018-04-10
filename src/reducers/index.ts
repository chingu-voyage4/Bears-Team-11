import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import appReducer from './appReducer';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  registerLoginWindow: appReducer
});
