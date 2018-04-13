import {
  ADD_MARKER,
  MOVE_MARKER,
  ADD_COMMENT,
  GET_MARKERS
} from './actionTypes';
import { Dispatch } from 'react-redux';

export function getMarkers(dispatch: Dispatch<{}>) {
  return {
    type: GET_MARKERS
  };
}

export function addMarker(dispatch: Dispatch<{}>) {
  return {
    type: ADD_MARKER
  };
}

export function moveMarker(dispatch: Dispatch<{}>) {
  return {
    type: MOVE_MARKER
  };
}

export function addComment(dispatch: Dispatch<{}>) {
  return {
    type: ADD_COMMENT
  };
}
