import { GET_PROJECTS } from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';

function projectReducer(
  state: ProjectState = {},
  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case GET_PROJECTS:
      return action.data;
    default:
      return state;
  }
}

export default projectReducer;
