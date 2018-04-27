import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { Project } from '../types/Projects';

function projectReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState | Project | Array<Project> {
  switch (action.type) {
    case GET_PROJECTS:
      return action.data as Array<Project>;
    case ADD_PROJECT:
      return action.data;
    case DELETE_PROJECT:
      return action.data;
    case UPDATE_PROJECT:
      return action.data;
    default:
      return state;
  }
}
export default projectReducer;
