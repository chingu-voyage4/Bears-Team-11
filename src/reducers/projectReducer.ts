import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_CATEGORIES,
  GET_TAGS
} from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';

// watch out for references when copying state
function projectReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState {
  var newState = state.slice();
  switch (action.type) {
    case GET_PROJECTS:
      newState.push(action.data);
      return newState;
    case ADD_PROJECT:
      newState.push(action.data);
      return newState;
    case UPDATE_PROJECT:
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].name === action.data.name) {
          newState[i] = action.data;
        }
      }
      return newState;
    case DELETE_PROJECT:
      var deleteIndex;
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].name === action.data.name) {
          deleteIndex = i;
        }
      }
      newState.splice(deleteIndex as number, 1);
      return newState;
    default:
      return state;
    case GET_TAGS:
      newState.push(action.data);
      return newState;
    case GET_CATEGORIES:
      newState.push(action.data);
      return newState;
  }
}
export default projectReducer;
