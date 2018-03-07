import { GET_PROJECTS } from './actionTypes';
import { Dispatch } from 'react-redux';
import { getProjectsAPI } from '../stubs/api';
import { Action } from '../types/Redux';

export function getProjects(): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    var projects = getProjectsAPI();
    return dispatch({
      type: GET_PROJECTS,
      data: projects
    });
  };
}
