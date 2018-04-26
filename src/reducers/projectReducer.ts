import {
  GET_PROJECTS,
  GET_ONE_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT
} from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { Project } from '../types/Projects';

function projectReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState | Project | Array<Project> {
  var newState = [...state];
  switch (action.type) {
    case GET_PROJECTS:
      return action.data as Array<Project>;
    case GET_ONE_PROJECT:
      return action.data;
    case ADD_PROJECT:
      return action.data;
    case DELETE_PROJECT:
      return newState;
    default:
      return state;
  }
}
export default projectReducer;
