import { GET_PROJECTS } from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';

export function getProjects(): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    var projects = apiService.getProjects();
    return dispatch({
      type: GET_PROJECTS,
      data: projects
    });
  };
}
