import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_TAGS,
  GET_CATEGORIES
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
  update: Project
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.updateProject(name, update).then(updatedProject => {
      return dispatch({
        type: UPDATE_PROJECT,
        data: updatedProject
      });
    });
  };
}

export function deleteProject(
  name: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.deleteProject(name).then(deletedProject => {
      return dispatch({
        type: DELETE_PROJECT,
        data: deletedProject
      });
    });
  };
}

export function getTags(tag: string): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getTags().then(tags => {
      return dispatch({
        type: GET_TAGS,
        data: tags
      });
    });
  };
}

export function getCategories(
  category: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getTags().then(categories => {
      return dispatch({
        type: GET_CATEGORIES,
        data: categories
      });
    });
  };
}
