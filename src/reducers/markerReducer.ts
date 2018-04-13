import {
  GET_MARKERS,
  ADD_MARKER,
  MOVE_MARKER,
  ADD_COMMENT
} from '../actions/actionTypes';
import { Marker } from '../types/Marker';
import { MarkerAction } from '../types/Redux';

function replaceMarker(markers: Array<Marker>, marker: Marker) {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].id === marker.id) {
      markers[i] = marker;
    }
  }
}

function markerReducer(state: Array<Marker> = [], action: MarkerAction) {
  var newState = state.slice();
  switch (action.type) {
    case GET_MARKERS:
      return action.data;
    case ADD_MARKER:
      newState.push(action.data as Marker);
      return newState;
    case MOVE_MARKER:
      replaceMarker(newState, action.data as Marker);
      return newState;
    case ADD_COMMENT:
      replaceMarker(newState, action.data as Marker);
      return newState;
    default:
      return state;
  }
}

export default markerReducer;
