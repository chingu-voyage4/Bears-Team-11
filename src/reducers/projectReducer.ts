import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT
} from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';

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
  }
}
export default projectReducer;
