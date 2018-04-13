import {
  GET_MARKERS,
  ADD_MARKER,
  MOVE_MARKER,
  ADD_COMMENT
} from '../actions/actionTypes';

function annotationReducer(state: {}, action: { type: string }) {
  switch (action.type) {
    case GET_MARKERS:
      break;
    case ADD_MARKER:
      break;
    case MOVE_MARKER:
      break;
    case ADD_COMMENT:
      break;
    default:
      break;
  }
}

export default annotationReducer;
