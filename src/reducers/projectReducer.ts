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
): ProjectState | Project {
  var newState = state.slice();
  switch (action.type) {
    case GET_PROJECTS:
      newState.push(action.data);
      return newState;
    case GET_ONE_PROJECT:
      return action.data as Project;
    case ADD_PROJECT:
      newState.push(action.data);
      return newState;
    case DELETE_PROJECT:
      var deleteIndex;
      for (let i = 0; i < newState.length; i++) {
        if (newState[i]._id === action.data._id) {
          deleteIndex = i;
        }
      }
      newState.splice(deleteIndex as number, 1);
      return newState;
    default:
      return state;
  }
}
export default projectReducer;
