import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_ONE_PROJECT,
  UPLOAD_PROJECT_IMAGES,
  SEARCH_PROJECT
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';
import { Project } from '../types/Projects.d';

export function getProjects(
  options: object,
  query: object | null
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getProjects(options, query).then(projects => {
      return dispatch({
        type: GET_PROJECTS,
        data: projects
      });
    });
  };
}

export function searchProjects(
  query: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    var options = { limit: 12 };
    var queryObject = {
      searchTerm: query
    };

    return apiService.getProjects(options, queryObject).then(projects => {
      return dispatch({
        type: SEARCH_PROJECT,
        data: projects
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
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return dispatch({
      type: UPDATE_PROJECT,
      data: id
    });
  };
}

export function getOneProject(
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getOneProject(id).then(project => {
      return dispatch({
        type: GET_ONE_PROJECT,
        data: project
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

export function uploadProjectImage(
  files: FileList
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.uploadProjectImage(files).then(contentUrl => {
      return dispatch({
        type: UPLOAD_PROJECT_IMAGES,
        data: contentUrl
      });
    });
  };
}
