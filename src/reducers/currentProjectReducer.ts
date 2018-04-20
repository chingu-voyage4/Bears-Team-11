import { GET_PROJECT } from '../actions/actionTypes';
import { CurrentProjectState, ProjectAction } from '../types/Redux';

function currentProjectReducer(
  state: CurrentProjectState = { _id: '' },
  action: ProjectAction
): CurrentProjectState {
  switch (action.type) {
    case GET_PROJECT:
      return action.data as CurrentProjectState;
    default:
      return state;
  }
}
export default currentProjectReducer;
