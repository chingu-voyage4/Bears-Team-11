import {
  ADD_MARKER,
  MOVE_MARKER,
  RESIZE_MARKER,
  ADD_COMMENT,
  GET_MARKERS
} from './actionTypes';
import { Dispatch } from 'react-redux';
import { MarkerAction } from '../types/Redux.d';
import { Marker } from '../types/Marker.d';
import apiService from '../utils/apiService';

export function getMarkers(
  revisionId: string
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService.getMarkers(revisionId).then(markers => {
      dispatch({
        type: GET_MARKERS,
        data: markers
      });
    });
  };
}

export function addMarker(
  revisionId: string,
  marker: Marker
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService.saveMarker(revisionId, marker).then(savedMarker => {
      dispatch({
        type: ADD_MARKER,
        data: savedMarker
      });
    });
  };
}

export function moveMarker(
  id: string,
  x: string,
  y: string
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService.updateMarkerPosition(id, x, y).then(updatedMarker => {
      dispatch({
        type: MOVE_MARKER,
        data: updatedMarker
      });
    });
  };
}

export function resizeMarker(
  id: string,
  width: string,
  height: string
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService
      .updateMarkerDimensions(id, width, height)
      .then(updatedMarker => {
        dispatch({
          type: RESIZE_MARKER,
          data: updatedMarker
        });
      });
  };
}

export function addComment(
  markerId: string,
  user: string,
  message: string
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService
      .addMarkerComment(markerId, user, message)
      .then((updatedMarker: Marker) => {
        dispatch({
          type: ADD_COMMENT,
          data: updatedMarker
        });
      });
  };
}
