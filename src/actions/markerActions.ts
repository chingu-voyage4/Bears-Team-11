import {
  ADD_MARKER,
  MOVE_MARKER,
  ADD_COMMENT,
  GET_MARKERS
} from './actionTypes';
import { Dispatch } from 'react-redux';
import { MarkerAction } from '../types/Redux.d';
import { Marker } from '../types/Marker.d';
import apiService from '../utils/apiService';

export type getMarkers_fntype = (
  revisionId: string
) => (dispatch: Dispatch<MarkerAction>) => void;

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

export type addMarker_fntype = (
  revisionId: string,
  marker: Marker
) => (dispatch: Dispatch<MarkerAction>) => void;

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

export type moveMarker_fntype = (
  revisionId: string,
  id: string,
  x: string,
  y: string,
  width: string,
  height: string
) => (dispatch: Dispatch<MarkerAction>) => void;

export function moveMarker(
  revisionId: string,
  id: string,
  x: string,
  y: string,
  width: string,
  height: string
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

export type addComment_fntype = (
  revisionId: string,
  markerId: string,
  comment: {
    user: string;
    time: string;
    message: string;
  }
) => (dispatch: Dispatch<MarkerAction>) => void;

export function addComment(
  revisionId: string,
  markerId: string,
  comment: {
    user: string;
    time: string;
    message: string;
  }
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService
      .addMarkerComment(revisionId, markerId, comment)
      .then((updatedMarker: Marker) => {
        dispatch({
          type: ADD_COMMENT,
          data: updatedMarker
        });
      });
  };
}
