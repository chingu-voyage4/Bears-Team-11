import { GET_TAGS } from '../actions/actionTypes';
import { Tags } from '../types/Tags';
import { TagsState, TagAction } from '../types/Redux';

function tagsReducer(state: TagsState = {}, action: TagAction): TagsState {
  switch (action.type) {
    case GET_TAGS:
      return action.data as Tags;
    default:
      return state;
  }
}

export default tagsReducer;
