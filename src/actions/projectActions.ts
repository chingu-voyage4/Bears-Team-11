import { GET_PROJECTS } from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';

export function getProjects(): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getProjects().then(projects => {
      return dispatch({
        type: GET_PROJECTS,
        data: projects
      });
    });
  };
}
