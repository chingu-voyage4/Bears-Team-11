import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';
import { Project } from '../types/Projects.d';

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

export function getProject(
  projectId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getProject(projectId).then(project => {
      return dispatch({
        type: GET_PROJECT,
        data: project
      });
    });
  };
}

export function addProject(
  project: Project
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.addProject(project).then(newProject => {
      return dispatch({
        type: ADD_PROJECT,
        data: newProject
      });
    });
  };
}

export function updateProject(
  name: string,
  update: string,
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.updateProject(name, update, id).then(updatedProject => {
      return dispatch({
        type: UPDATE_PROJECT,
        data: updatedProject
      });
    });
  };
}

export function deleteProject(
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.deleteProject(id).then(deletedProject => {
      return dispatch({
        type: DELETE_PROJECT,
        data: deletedProject
      });
    });
  };
}
