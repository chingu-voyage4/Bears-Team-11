import {
  GET_MARKERS,
  ADD_MARKER,
  MOVE_MARKER,
  ADD_COMMENT,
  GET_MARKER_COMMENT,
  RESIZE_MARKER,
  RESOLVE_MARKER,
  DELETE_MARKER
} from '../actions/actionTypes';
import { Marker } from '../types/Marker';
import { MarkerAction } from '../types/Redux';

function replaceMarker(markers: Array<Marker>, marker: Marker) {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]._id === marker._id) {
      markers[i] = marker;
    }
  }
}

function addCommentToMarker(markers: Array<Marker>, data: any) {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]._id === data.markerId) {
      var marker = markers[i];
      var newMarker = Object.assign({}, marker);
      newMarker.comments.push(data.comment);
      markers[i] = newMarker;
    }
  }
}

function markerReducer(state: Array<Marker> = [], action: MarkerAction) {
  var newState = state.slice();
  switch (action.type) {
    case GET_MARKERS:
      return action.data ? action.data : state;
    case ADD_MARKER:
      newState.push(action.data as Marker);
      return newState;
    case MOVE_MARKER:
      replaceMarker(newState, action.data as Marker);
      return newState;
    case RESIZE_MARKER:
      replaceMarker(newState, action.data as Marker);
      return newState;
    case ADD_COMMENT:
      addCommentToMarker(newState, action.data as any);
      return newState;
    case GET_MARKER_COMMENT:
      replaceMarker(newState, action.data as Marker);
      return newState;
    case DELETE_MARKER:
      return state.filter(marker => {
        return marker._id !== action.markerId;
      });
    case RESOLVE_MARKER:
      return state.map(marker => {
        if (marker._id === action.markerId) {
          return Object.assign({}, marker, { isResolved: true });
        }
        return marker;
      });
    default:
      return state;
  }
}

export default markerReducer;
