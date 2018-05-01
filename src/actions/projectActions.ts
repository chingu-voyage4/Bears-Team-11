import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_ONE_PROJECT,
  SEARCH_PROJECT,
  GET_PROJECT,
  DOWNLOAD_PROJECT_IMAGE_URLS
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';

export type getProjects_fntype = (
  options: object,
  query: object | null
) => Promise<void>;

export function getProjects(
  options: object,
  query: object | null
): (dispatch: Dispatch<Action>) => Promise<void> {
  return dispatch => {
    async function doAsyncWork(): Promise<void> {
      var projects = await apiService.getProjects(options, query);
      dispatch({ type: GET_PROJECTS, data: projects });
    }

    return doAsyncWork();
  };
}

export type searchProjects_fntype = (
  query: string | null
) => (dispatch: Dispatch<Action>) => void;

export function searchProjects(
  query: string | null
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return dispatch({
      type: SEARCH_PROJECT,
      data: query
    });
  };
}

export type getProject_fntype = (
  projectId: string
) => (dispatch: Dispatch<Action>) => void;

export function getProject(
  projectId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getProject(projectId).then(project => {
      if (project) {
        return dispatch({
          type: GET_PROJECT,
          data: project
        });
      } else {
        return null;
      }
    });
  };
}

async function addOrUpdateProjectWithDispatchAsync(
  dispatchType: any,
  dispatch: Dispatch<Action>,
  project: any,
  files: FileList
): Promise<void> {
  var newProject = await apiService.addOrUpdateProject(project);
  if (files) {
    await apiService.uploadProjectImage(files, newProject._id);
  }
  dispatch({ type: dispatchType, data: newProject });
}

export type addOrUpdateProject_fntype = (
  project: any,
  files: FileList
) => Promise<void>;

export function addOrUpdateProject(
  project: any,
  files: FileList
): (dispatch: Dispatch<Action>) => Promise<void> {
  return dispatch => {
    var dispatchType = project.hasOwnProperty('_id')
      ? UPDATE_PROJECT
      : ADD_PROJECT;
    return addOrUpdateProjectWithDispatchAsync(
      dispatchType,
      dispatch,
      project,
      files
    );
  };
}

async function getOneProjectWithDispatchAsync(
  dispatchType: any,
  dispatch: Dispatch<Action>,
  id: string
): Promise<void> {
  var project = await apiService.getOneProject(id);
  dispatch({ type: dispatchType, data: project });
}
export type getOneProject_fntype = (id: string) => Promise<void>;

export function getOneProject(
  id: string
): (dispatch: Dispatch<Action>) => Promise<void> {
  return dispatch => {
    return getOneProjectWithDispatchAsync(GET_ONE_PROJECT, dispatch, id);
  };
}

export type deleteProject_fntype = (
  id: string
) => (dispatch: Dispatch<Action>) => void;

export function deleteProject(
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.deleteProject(id).then(project => {
      return dispatch({
        type: DELETE_PROJECT,
        data: project
      });
    });
  };
}

export type downloadProjectImageURLS_fntype = (
  projectId: string
) => (dispatch: Dispatch<Action>) => void;

export function downloadProjectImageURLS(
  projectId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.downloadProjectImageURLS(projectId).then(urls => {
      return dispatch({
        type: DOWNLOAD_PROJECT_IMAGE_URLS,
        data: urls
      });
    });
  };
}
