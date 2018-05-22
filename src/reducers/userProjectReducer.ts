import { GET_USER_PROJECTS } from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { Project } from '../types/Projects';

function userProjectReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState | Array<Project> {
  switch (action.type) {
    case GET_USER_PROJECTS:
      return action.data as Array<Project>;
    default:
      return state;
  }
}
export default userProjectReducer;
