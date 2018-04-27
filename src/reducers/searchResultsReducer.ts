import { SEARCH_PROJECT } from '../actions/actionTypes';

function searchResultsReducer(
  state: string | null = '',
  action: { type: string; data: string }
): string | null {
  switch (action.type) {
    case SEARCH_PROJECT:
      return action.data;
    default:
      return state;
  }
}
export default searchResultsReducer;
