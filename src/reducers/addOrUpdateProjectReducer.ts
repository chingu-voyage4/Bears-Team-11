import { UPDATE_PROJECT } from '../actions/actionTypes';

function addOrUpdateProjectReducer(
  state: string | null,
  action: { data: string; type: string }
): string | null {
  switch (action.type) {
    case UPDATE_PROJECT:
      return action.data;
    default:
      return null;
  }
}
export default addOrUpdateProjectReducer;
