import { GET_ONE_PROJECT } from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { Project } from '../types/Projects';

function addOrUpdateProjectReducer(
  state: ProjectState | Project = [],
  action: ProjectAction
): ProjectState | Project {
  switch (action.type) {
    case GET_ONE_PROJECT:
      return action.data as Project;
    default:
      return state;
  }
}
export default addOrUpdateProjectReducer;
