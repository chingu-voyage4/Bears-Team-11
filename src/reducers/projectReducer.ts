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
): ProjectState | Array<Project> {
  var newState = state.slice();
  switch (action.type) {
    case GET_PROJECTS:
      return action.data as Array<Project>;
    case ADD_PROJECT:
      newState.push(action.data as Project);
      return newState;
    case DELETE_PROJECT:
      return action.data as Array<Project>;
    case UPDATE_PROJECT:
      for (let i = 0; i < newState.length; i++) {
        if (newState[i]._id === (action.data as Project)._id) {
          newState[i] = action.data as Project;
        }
      }
      return newState;
    default:
      return state;
  }
}
export default projectReducer;
