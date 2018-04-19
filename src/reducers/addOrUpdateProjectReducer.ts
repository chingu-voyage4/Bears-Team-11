import { UPDATE_PROJECT } from '../actions/actionTypes';
import { ProjectAction } from '../types/Redux';

function addOrUpdateProjectReducer(
  state: string | null,
  action: ProjectAction
): string | null {
  switch (action.type) {
    case UPDATE_PROJECT:
      return action.data as string;
    default:
      return null;
  }
}
export default addOrUpdateProjectReducer;
