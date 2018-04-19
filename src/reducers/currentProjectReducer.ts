import { GET_PROJECT } from '../actions/actionTypes';
import { CurrentProjectState, ProjectAction } from '../types/Redux';

function currentProjectReducer(
  state: CurrentProjectState = {},
  action: ProjectAction
): CurrentProjectState {
  switch (action.type) {
    case GET_PROJECT:
      return action.data;
    default:
      return state;
  }
}
export default currentProjectReducer;
