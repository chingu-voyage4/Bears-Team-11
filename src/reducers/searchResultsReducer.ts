import { SEARCH_PROJECT } from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { Project } from '../types/Projects';

function searchResultsReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState | Project {
  switch (action.type) {
    case SEARCH_PROJECT:
      return action.data;
    default:
      return state;
  }
}
export default searchResultsReducer;
